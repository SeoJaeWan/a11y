import path from 'node:path';

import type { FileChooser, Frame, Locator } from '@playwright/test';
import { test } from '@playwright/test';

import { OWN_DIR } from '../own-dir';
import { findFileOpener } from '../page-scripts/find-file-opener';
import {
  findKeyHints,
  isChecked,
  isMacBrowser,
  previewElement,
  readLabelText,
} from '../page-scripts/read-element';
import { describeLocator } from '../playwright-internal/describe-locator';
import type { Caller } from './caller';
import { findCaller, userFrames } from './caller';
import { describeElement, describeFrame } from './describe-element';
import { roleOf } from './element-label';
import { pressKey } from './keys';
import { arrowSymbol, describeMoves } from './moves';
import type { Reach } from './reach';
import { reach, reachElement } from './reach';
import { pickShortcut } from './shortcut';
import { reserveLine } from './summary';

/** Name each intercepted action shows in results, by its frame method. */
const DISPLAY_NAMES = {
  click: 'click',
  fill: 'fill',
  check: 'check',
  uncheck: 'uncheck',
  selectOption: 'selectOption',
  hover: 'hover',
  dragAndDrop: 'dragTo',
  dblclick: 'dblclick',
  tap: 'tap',
  setInputFiles: 'setInputFiles',
} as const;

export type ActionName = keyof typeof DISPLAY_NAMES;

/** One intercepted action of the user's test. */
export type ActionCall = {
  name: ActionName;
  frame: Frame;
  selector: string;
  /** Arguments after the selector, as the test passed them. */
  args: readonly unknown[];
  /** Stack taken where the action was intercepted; it holds the user's line. */
  stack: string;
  /** Runs the action the way Playwright does without this package. */
  runOriginal: () => Promise<unknown>;
};

type ActionOptions = { strict?: boolean; timeout?: number; button?: string };

/** How the keyboard run treats what it cannot do. */
export type A11yOptions = {
  /**
   * What to do with an action that has no keyboard way, such as a drag. `fail` (the default)
   * fails the test on that line. `pass` runs the action the original way, lets the test go on,
   * and reports the line as not checked.
   */
  unsupportedActions?: 'fail' | 'pass';
};

/** Actions with no keyboard way of their own. */
const UNSUPPORTED_ACTIONS = new Set<ActionName>(['dragAndDrop', 'dblclick', 'tap']);
const NOT_CHECKED = '검사하지 못함: 키보드로 바꿔 실행하는 방법이 정해지지 않은 동작입니다';
const NOT_CHECKED_DRAG =
  '검사하지 못함: 드래그는 키보드 대안이 필요한 동작이며 확인하지 못했습니다';

/** Roles whose keyboard action is Space, by the ARIA Authoring Practices. Others use Enter. */
const SPACE_ROLES = new Set(['checkbox', 'radio', 'switch']);

/**
 * How long to wait for the file dialog after the key. The browser opens it while it handles the
 * key, so a dialog that has not come by then is not coming.
 */
const FILE_CHOOSER_WAIT_MS = 2000;

/** How long to wait for a menu after Enter on a menu button. It opens while the key is handled. */
const MENU_WAIT_MS = 2000;

/** How often to look again while waiting for a disabled element to turn on. */
const ENABLED_POLL_MS = 50;

/**
 * Runs one action of the test with the keyboard and records what happened on its line.
 * @param call Intercepted action.
 * @param settings Options the user gave `withA11y`.
 */
export async function handleAction(call: ActionCall, settings: A11yOptions): Promise<unknown> {
  const caller = findCaller(call.stack, OWN_DIR);
  return test.step(
    `${DISPLAY_NAMES[call.name]} (키보드)`,
    () => runWithKeyboard(call, caller, settings),
    {
      // Not boxed: a boxed step hides the code line of the test from the error.
      box: false,
      ...(caller ? { location: caller } : {}),
    },
  );
}

/**
 * Reaches the target with the keyboard and acts on it the way its kind of action needs.
 * @param call Intercepted action.
 * @param caller Line of the user's test that called the action.
 * @param settings Options the user gave `withA11y`.
 */
async function runWithKeyboard(
  call: ActionCall,
  caller: Caller | undefined,
  settings: A11yOptions,
): Promise<unknown> {
  const { name, frame, args } = call;
  const options = readOptions(args.at(-1));
  const prefix = `${caller ? String(caller.line) : '?'}행 ${DISPLAY_NAMES[name]}`;
  const button = options.button ?? 'left';
  const locator = frame.locator(call.selector);
  // `page.click(selector)` is not strict: like Playwright, it acts on the first match.
  const target = options.strict === true ? locator : locator.first();
  const page = frame.page();

  // A double click has a keyboard way only when the site names a key on the element. A right
  // click uses the key the site names too, or Enter when the element is a menu button.
  const isRightClick = name === 'click' && button === 'right';
  const hints =
    name === 'dblclick' || isRightClick
      ? await readKeyHints(call, target, options, prefix)
      : undefined;
  const shortcut = hints?.shortcut;
  const isMenuButton = isRightClick && shortcut === undefined && hints?.isMenuButton === true;
  // The middle button has no key. The right button has the context menu key, but not on macOS:
  // Shift+F10 opens nothing there and a Mac keyboard has no context menu key.
  const isMacRightClick =
    isRightClick && shortcut === undefined && !isMenuButton && (await frame.evaluate(isMacBrowser));
  const isMouseOnlyClick =
    name === 'click' && button !== 'left' && (button !== 'right' || isMacRightClick);
  if ((UNSUPPORTED_ACTIONS.has(name) && shortcut === undefined) || isMouseOnlyClick) {
    if (settings.unsupportedActions !== 'pass') {
      reserveLine(prefix, '실패: 키보드로 실행할 수 없는 동작');
      throw pointAtUser(new Error(describeUnsupported(name, isMacRightClick)), call.stack);
    }
    // Nothing passes silently: an action the keyboard did not run is said to be unchecked.
    reserveLine(prefix, name === 'dragAndDrop' ? NOT_CHECKED_DRAG : NOT_CHECKED);
    console.log(
      `[journey-a11y] ${describeCaller(caller)} ${DISPLAY_NAMES[name]} — 키보드로 검사하지 못했습니다`,
    );
    return call.runOriginal();
  }

  if (name === 'setInputFiles') return uploadWithKeyboard(call, target, options, prefix);
  const setLine = reserveLine(prefix, '실패: 목표가 화면에 나타나지 않음');
  try {
    // Wait for what the original action waits for, so a slow page does not fail the keyboard run.
    await target.waitFor({
      state: 'visible',
      ...(options.timeout === undefined ? {} : { timeout: options.timeout }),
    });
    if (name !== 'hover') {
      setLine('실패: 목표가 켜지지 않음');
      await waitUntilEnabled(target, options.timeout);
    }
  } catch (error) {
    throw pointAtUser(error, call.stack);
  }

  const result = await reach(target);
  if (result.kind !== 'reached') {
    if (name === 'hover') {
      // Hover only prepares the next action, so the next line decides.
      setLine('통과: 포커스를 받을 수 없어 넘어감');
      return undefined;
    }
    setLine('실패: 닿을 수 없음');
    throw pointAtUser(new Error(describeFailure(target, result)), call.stack);
  }

  const element = await describeElement(frame, result.answer);
  const label = (await describeFrame(result.answer)) + element;
  const moves = describeMoves(result);
  switch (name) {
    case 'click': {
      if (isRightClick && shortcut !== undefined) {
        await pressShortcut(call, shortcut);
        setLine(`통과: ${moves}, ${label}에서 ${shortcut} (aria-keyshortcuts)`);
        return undefined;
      }
      if (isMenuButton) {
        // A menu button promises a menu on Enter, so the menu is looked for right away.
        const ownFrame = (await result.answer.ownerFrame()) ?? frame;
        const menus = ownFrame.locator('[role="menu"]:visible');
        const before = await menus.count();
        await pressKey(page, 'Enter');
        if (!(await waitForMore(menus, before))) {
          setLine('실패: Enter를 눌렀지만 메뉴가 열리지 않음');
          throw pointAtUser(
            new Error(
              `aria-haspopup="menu"인 ${label}에서 Enter를 눌렀지만 메뉴(role="menu")가 열리지 않았습니다: ${describeLocator(target)}`,
            ),
            call.stack,
          );
        }
        setLine(`통과: ${moves}, ${label}에서 Enter (aria-haspopup)`);
        return undefined;
      }
      if (isRightClick) {
        await pressKey(page, 'Shift+F10');
        setLine(`통과: ${moves}, ${label}에서 Shift+F10`);
        return undefined;
      }
      const key = SPACE_ROLES.has(roleOf(element)) ? 'Space' : 'Enter';
      await pressKey(page, key);
      setLine(`통과: ${moves}, ${label}에서 ${key}`);
      return undefined;
    }
    case 'fill': {
      // Entering the value is what Playwright's fill already does without keys; the site can
      // only break reaching the field.
      await call.runOriginal();
      setLine(`통과: ${moves}, ${label}에 닿음, 값은 원래 방식으로 입력`);
      return undefined;
    }
    case 'check':
    case 'uncheck': {
      const shouldBeOn = name === 'check';
      if ((await result.answer.evaluate(isChecked)) === shouldBeOn) {
        // Arrow keys select a radio on arrival, so there is nothing left to press.
        setLine(`통과: ${moves}, ${label} ${shouldBeOn ? '선택' : '해제'}`);
        return undefined;
      }
      await pressKey(page, 'Space');
      setLine(`통과: ${moves}, ${label}에서 Space`);
      return undefined;
    }
    case 'selectOption': {
      // Picking inside a native select is the browser's job; the site can only break reaching it.
      const value = await call.runOriginal();
      setLine(`통과: ${moves}, ${label}에 닿음, 값은 원래 방식으로 선택`);
      return value;
    }
    case 'hover': {
      setLine(`통과: ${moves}, ${label}으로 포커스 이동`);
      return undefined;
    }
    case 'dblclick': {
      if (shortcut === undefined) return call.runOriginal();
      await pressShortcut(call, shortcut);
      setLine(`통과: ${moves}, ${label}에서 ${shortcut} (aria-keyshortcuts)`);
      return undefined;
    }
    default:
      return call.runOriginal();
  }
}

/**
 * Reads the key the site names for the target of a double click, if any.
 * @param call Intercepted `dblclick` action.
 * @param target Element the test pointed at.
 * @param options Options the test gave the action.
 * @param prefix Line number and action name for the summary.
 */
async function readKeyHints(
  call: ActionCall,
  target: Locator,
  options: ActionOptions,
  prefix: string,
): Promise<{ shortcut: string | undefined; isMenuButton: boolean }> {
  try {
    const timeout = options.timeout === undefined ? {} : { timeout: options.timeout };
    const hints = await target.evaluate(findKeyHints, undefined, timeout);
    return { shortcut: pickShortcut(hints.shortcuts), isMenuButton: hints.isMenuButton };
  } catch (error) {
    reserveLine(prefix, '실패: 목표가 페이지에 나타나지 않음');
    throw pointAtUser(error, call.stack);
  }
}

/**
 * Presses the key the site names for an element.
 * @param call Intercepted action.
 * @param shortcut Key from `aria-keyshortcuts`, e.g. `Alt+M`.
 */
async function pressShortcut(call: ActionCall, shortcut: string): Promise<void> {
  try {
    // The key comes from the site, so any key name can appear; Playwright knows them all.
    await call.frame.page().keyboard.press(shortcut);
  } catch (error) {
    throw pointAtUser(error, call.stack);
  }
}

/**
 * Waits a short while for more elements to match than before the key.
 * @param matches Locator of the elements to count.
 * @param before How many matched before the key.
 */
async function waitForMore(matches: Locator, before: number): Promise<boolean> {
  const deadline = Date.now() + MENU_WAIT_MS;
  for (;;) {
    if ((await matches.count()) > before) return true;
    if (Date.now() >= deadline) return false;
    await matches.page().waitForTimeout(ENABLED_POLL_MS);
  }
}

/**
 * Writes why an action cannot run with the keyboard and what the developer can do about it.
 * @param name Action the test called.
 * @param isMacRightClick Whether the action is a right click in a browser on macOS.
 */
function describeUnsupported(name: ActionName, isMacRightClick: boolean): string {
  const action = isMacRightClick ? '우클릭' : DISPLAY_NAMES[name];
  let hint = '';
  if (name === 'dblclick') hint = '요소에 aria-keyshortcuts로 키를 적어 두면 그 키로 실행합니다.\n';
  // The same test passes on other systems, so the message says why it fails here.
  if (isMacRightClick) hint = 'macOS에는 우클릭 메뉴를 여는 키가 없습니다.\n';
  return (
    `키보드로 실행할 수 없는 동작입니다: ${action}\n${hint}` +
    '같은 일을 키보드로 하는 테스트가 있다면 이 테스트 위에 ' +
    '"// a11y-alternative: <그 테스트의 제목>"을 적어 주세요.'
  );
}

/**
 * Puts files into a file input the way a keyboard user does: reach the element that opens the
 * file dialog, press Enter, and give the files to the dialog that opened. Picking inside the
 * dialog belongs to the operating system, so only opening it is done with the keyboard.
 * @param call Intercepted `setInputFiles` action.
 * @param target File input the test pointed at.
 * @param options Options the test gave the action.
 * @param prefix Line number and action name for the summary.
 */
async function uploadWithKeyboard(
  call: ActionCall,
  target: Locator,
  options: ActionOptions,
  prefix: string,
): Promise<undefined> {
  const { frame, stack } = call;
  const page = frame.page();
  const timeout = options.timeout === undefined ? {} : { timeout: options.timeout };
  const setLine = reserveLine(prefix, '실패: 목표가 페이지에 나타나지 않음');
  try {
    // The original action takes a hidden input too, so it waits only for the input to exist.
    await target.waitFor({ state: 'attached', ...timeout });
  } catch (error) {
    throw pointAtUser(error, stack);
  }

  const header = `키보드로 닿을 수 없습니다: ${describeLocator(target)}`;
  const opener = (await target.evaluateHandle(findFileOpener)).asElement();
  if (!opener) {
    setLine('실패: 닿을 수 없음');
    const preview = await target.evaluate(previewElement);
    throw pointAtUser(
      new Error(
        `${header}
목표 ${preview}은(는) 화면에 보이지 않고, 화면에 보이는 연결된 label도 없습니다.
` + '파일 선택 창을 여는 요소를 click하도록 테스트를 쓰면 키보드로 확인할 수 있습니다.',
      ),
      stack,
    );
  }
  const result = await reachElement(page, opener);
  if (result.kind !== 'reached') {
    setLine('실패: 닿을 수 없음');
    throw pointAtUser(new Error(describeFailure(target, result)), stack);
  }

  const labelText = await result.answer.evaluate(readLabelText);
  const element =
    labelText === null ? await describeElement(frame, result.answer) : `label "${labelText}"`;
  const label = (await describeFrame(result.answer)) + element;
  const opened = page
    .waitForEvent('filechooser', { timeout: FILE_CHOOSER_WAIT_MS })
    .catch(() => undefined);
  // Listening turns on Playwright's hold on file dialogs, but without waiting for the browser.
  // The key goes by another connection, so one round trip lets the hold arrive first.
  await frame.evaluate(() => undefined);
  await pressKey(page, 'Enter');
  const chooser = await opened;
  if (!chooser) {
    setLine('실패: 파일 선택 창이 열리지 않음');
    throw pointAtUser(
      new Error(
        `${label}에서 Enter를 눌렀지만 파일 선택 창이 열리지 않았습니다: ${describeLocator(target)}`,
      ),
      stack,
    );
  }
  await chooser.setFiles(call.args[0] as Parameters<FileChooser['setFiles']>[0], timeout);
  setLine(`통과: ${describeMoves(result)}, ${label}에서 Enter, 열린 선택 창에 파일을 넣음`);
  return undefined;
}

/**
 * Reads the options object of an action, which Playwright passes last and may leave out.
 * @param value Last argument of the action.
 */
function readOptions(value: unknown): ActionOptions {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value : {};
}

/**
 * Waits for a disabled element to turn on, as long as the original action would wait.
 * Without a timeout the test's own time limit ends the wait.
 * @param target Element the test pointed at.
 * @param timeout Time limit the test gave the action, if any.
 */
async function waitUntilEnabled(target: Locator, timeout: number | undefined): Promise<void> {
  const deadline = timeout === undefined || timeout === 0 ? Infinity : Date.now() + timeout;
  while (!(await target.isEnabled())) {
    if (Date.now() > deadline) {
      throw new Error(
        `${describeLocator(target)}: ${String(timeout)}ms 안에 켜지지 않았습니다(disabled).`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, ENABLED_POLL_MS));
  }
}

/**
 * Writes why the keyboard could not reach the target.
 * @param target Element the test pointed at.
 * @param result How the search ended.
 */
function describeFailure(target: Locator, result: Exclude<Reach, { kind: 'reached' }>): string {
  const header = `키보드로 닿을 수 없습니다: ${describeLocator(target)}`;
  if (result.kind === 'not-focusable') {
    return `${header}\n목표 ${result.preview}은(는) 포커스를 받을 수 없는 요소입니다.`;
  }
  const key = result.key === 'Tab' ? 'Tab' : `방향키(${arrowSymbol(result.key)})`;
  return `${header}\n${key}을 한 바퀴(${String(result.presses)}번) 눌렀지만 목표에 포커스가 오지 않았습니다.`;
}

/**
 * Writes the file and line of the user's test for a terminal notice.
 * @param caller Line of the user's test that called the action.
 */
function describeCaller(caller: Caller | undefined): string {
  if (!caller) return '?';
  const file = path.relative(test.info().project.testDir, caller.file).split(path.sep).join('/');
  return `${file}:${String(caller.line)}`;
}

/**
 * Makes an error show the user's test line instead of this package's code.
 * @param error Error raised while handling the action.
 * @param stack Stack taken where the action was intercepted.
 */
function pointAtUser(error: unknown, stack: string): unknown {
  if (!(error instanceof Error)) return error;
  const header = `${error.name}: ${error.message}`;
  error.stack = [header, ...userFrames(stack, OWN_DIR)].join('\n');
  return error;
}
