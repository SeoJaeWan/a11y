import { AsyncLocalStorage } from 'node:async_hooks';

import type { Browser, Frame, TestInfo } from '@playwright/test';

import type { ActionCall, ActionName } from '../run/handle-action';

/** What the package does at each point it hooks into a test of its project. */
export type Interception = {
  onAction: (call: ActionCall) => Promise<unknown>;
  onTestStart: (testInfo: TestInfo) => void;
  onTestEnd: (testInfo: TestInfo) => Promise<void>;
};

type FrameMethod = (this: Frame, selector: string, ...args: unknown[]) => Promise<unknown>;
type FramePrototype = Record<ActionName, FrameMethod>;

/** Frame methods every locator and page action ends up in. */
const ACTION_NAMES: readonly ActionName[] = [
  'click',
  'fill',
  'check',
  'uncheck',
  'selectOption',
  'hover',
  'dragAndDrop',
];

const insideTool = new AsyncLocalStorage<true>();
let isInstalled = false;

/**
 * Builds the `use` of a project whose tests run through the interception. A function placed in
 * an option slot runs as a fixture for that project only, so other projects stay untouched.
 * This is not a documented Playwright contract.
 * @param interception What to do on each action and at the start and end of each test.
 */
export function interceptInProject(interception: Interception): { testIdAttribute: string } {
  /**
   * Installs the patch once per worker and wraps each test of the project.
   * @param fixtures Playwright fixtures this one depends on.
   * @param fixtures.browser Browser of the worker, used to get at the frame prototype.
   * @param use Continues the test with the option value.
   * @param testInfo Test that is running.
   */
  async function install(
    { browser }: { browser: Browser },
    use: (value: string) => Promise<void>,
    testInfo: TestInfo,
  ): Promise<void> {
    if (!isInstalled) {
      await patchFrame(browser, interception);
      isInstalled = true;
    }
    interception.onTestStart(testInfo);
    // The slot belongs to the test id attribute; a changed attribute name is not supported yet.
    await use('data-testid');
    await interception.onTestEnd(testInfo);
  }
  return { testIdAttribute: install as unknown as string };
}

/**
 * Replaces the action methods of the client `Frame` so they go through the interception.
 * The prototype is only reachable from a live page, so a page is opened once for it.
 * @param browser Browser of the worker.
 * @param interception Receiver of the intercepted actions.
 */
async function patchFrame(browser: Browser, interception: Interception): Promise<void> {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    const prototype = Object.getPrototypeOf(page.mainFrame()) as FramePrototype;
    for (const name of ACTION_NAMES) {
      const original = prototype[name];
      prototype[name] = function patched(selector, ...args) {
        // Actions the package runs itself must not be intercepted again.
        if (insideTool.getStore()) return original.call(this, selector, ...args);
        const stack = new Error().stack ?? '';
        return insideTool.run(true, () =>
          interception.onAction({
            name,
            frame: this,
            selector,
            args,
            stack,
            runOriginal: () => original.call(this, selector, ...args),
          }),
        );
      };
    }
  } finally {
    await context.close();
  }
}
