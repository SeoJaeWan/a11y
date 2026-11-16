// Prints the Tab stops of a test app page as Journey A11y stop records, read from Chromium's
// accessibility tree. Used to write expected JSON for scenario cases.
//
// Usage, from the repository root with `pnpm dev:app` running on 5174:
//   node test/tools/probe-stops.mjs cases/reach/plain-button [maxTabs] [--start "<selector to focus first>"]
//   node test/tools/probe-stops.mjs pieces/x --keys "Tab,Tab,ArrowRight"   (custom key sequence)
// Stops inside an iframe print `iframe(inner)`: read those from the frame content by hand.
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
// Git Bash may rewrite a leading "/" into a Windows path, so accept "cases/..." and fix it up.
const urlPath = '/' + args[0].slice(args[0].search(/(cases|pieces)\//));
const maxTabs = Number(args.find((a, i) => i > 0 && /^\d+$/.test(a)) ?? 50);
const keysArg = args[args.indexOf('--keys') + 1];
const keys = args.includes('--keys') ? keysArg.split(',') : undefined;
const start = args.includes('--start') ? args[args.indexOf('--start') + 1] : undefined;

const LANDMARKS = new Set([
  'banner',
  'navigation',
  'main',
  'complementary',
  'contentinfo',
  'region',
  'search',
  'form',
]);
const STATE_KEYS = [
  'checked',
  'disabled',
  'expanded',
  'invalid',
  'pressed',
  'readonly',
  'required',
  'selected',
];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:5174${urlPath}`);
await page.locator('#root > *').first().waitFor();
if (start) await page.locator(start).focus();
const cdp = await page.context().newCDPSession(page);

const stops = [];
const sequence = keys ?? Array.from({ length: maxTabs }, () => 'Tab');
let firstKey;
for (const [i, key] of sequence.entries()) {
  await page.keyboard.press(key);
  const stop = await readFocused();
  const id = stop ? `${stop.role}|${stop.name}|${stop._path}` : 'body';
  if (!keys) {
    if (firstKey === undefined) firstKey = id;
    else if (id === firstKey) {
      console.log(`-- back to the first stop after ${i} Tabs (round)`);
      break;
    }
  }
  if (stop) {
    delete stop._path;
    stops.push({ index: i + 1, key, ...stop });
  } else {
    stops.push({ index: i + 1, key, role: null, note: 'focus on body or outside the page' });
  }
}
console.log(JSON.stringify(stops, null, 2));
await browser.close();

async function readFocused() {
  const handle = await page.evaluateHandle(() => {
    let el = document.activeElement;
    while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
    return el === document.body ? null : el;
  });
  const el = handle.asElement();
  if (!el) return undefined;
  const frame = await el.ownerFrame();
  if (frame && frame !== page.mainFrame()) {
    const inner = await frame.evaluateHandle(() => document.activeElement);
    return {
      role: 'iframe(inner)',
      name: '',
      note: 'focus is inside an iframe; read it by hand',
      _path: '',
    };
  }
  const { result } = await cdp.send('Runtime.evaluate', {
    expression: `(() => { let el = document.activeElement; while (el && el.shadowRoot && el.shadowRoot.activeElement) el = el.shadowRoot.activeElement; return el; })()`,
  });
  const { nodes } = await cdp.send('Accessibility.getPartialAXTree', {
    objectId: result.objectId,
    fetchRelatives: true,
  });
  const node = nodes.find((n) => !n.ignored && n.backendDOMNodeId) ?? nodes[0];
  const { nodes: all } = await cdp.send('Accessibility.getFullAXTree');
  const byId = new Map(all.map((n) => [n.nodeId, n]));
  const target =
    all.find((n) => n.backendDOMNodeId === node.backendDOMNodeId && !n.ignored) ?? node;
  const name = target.name?.value ?? '';
  const states = {};
  for (const prop of target.properties ?? []) {
    if (!STATE_KEYS.includes(prop.name)) continue;
    // Chromium reports tristate values as strings; "invalid: false" is on every control, so drop it.
    let value = prop.value.value;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    if (prop.name === 'invalid' && value === false) continue;
    states[prop.name] = value;
  }
  // landmarks: ancestors outer -> inner
  const landmarks = [];
  let cur = target.parentId ? byId.get(target.parentId) : undefined;
  while (cur) {
    const role = cur.role?.value;
    const lname = cur.name?.value ?? '';
    if (
      !cur.ignored &&
      LANDMARKS.has(role) &&
      !((role === 'region' || role === 'form') && !lname)
    ) {
      landmarks.unshift(lname ? `${role} "${lname}"` : role);
    }
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
  }
  // nearest preceding heading in tree (document) order
  const order = [];
  const walk = (n) => {
    order.push(n);
    for (const c of n.childIds ?? []) {
      const child = byId.get(c);
      if (child) walk(child);
    }
  };
  walk(all[0]);
  let heading = null;
  for (const n of order) {
    if (n === target) break;
    if (!n.ignored && n.role?.value === 'heading') {
      const level = n.properties?.find((p) => p.name === 'level')?.value.value;
      heading = `h${level} ${n.name?.value ?? ''}`;
    }
  }
  return {
    role: target.role?.value,
    name,
    nameSource: name ? nameSource(target) : null,
    states,
    landmarks,
    heading,
    _path: String(target.backendDOMNodeId),
  };
}

function nameSource(node) {
  const source = node.name?.sources?.find((s) => s.value || s.attributeValue);
  const used = node.name?.sources?.find(
    (s) => !s.superseded && (s.value?.value || s.attributeValue?.value),
  );
  const s = used ?? source;
  if (!s) return 'unknown';
  if (s.type === 'contents') return 'contents';
  if (s.type === 'placeholder') return 'placeholder';
  if (s.type === 'relatedElement') {
    if (s.attribute === 'aria-labelledby') return 'aria-labelledby';
    return 'label';
  }
  if (s.type === 'attribute') {
    if (s.attribute === 'aria-label') return 'aria-label';
    if (s.attribute === 'title') return 'title';
    if (s.attribute === 'alt') return 'alt';
    if (s.attribute === 'placeholder') return 'placeholder';
    return s.attribute ?? 'attribute';
  }
  return s.type;
}
