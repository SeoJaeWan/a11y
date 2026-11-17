import path from 'node:path';

import type { Frame, Locator } from '@playwright/test';
import { test } from '@playwright/test';

import { OWN_DIR } from '../own-dir';
import { isChecked } from '../page-scripts/read-element';
import { describeLocator } from '../playwright-internal/describe-locator';
import type { Caller } from './caller';
import { findCaller, userFrames } from './caller';
import { describeElement } from './describe-element';
import { roleOf } from './element-label';
import { insertText, pressKey } from './keys';
import { arrowSymbol, describeMoves } from './moves';
import type { Reach } from './reach';
import { reach } from './reach';
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

type ActionOptions = { strict?: boolean; timeout?: number };

/** Roles whose keyboard action is Space, by the ARIA Authoring Practices. Others use Enter. */
const SPACE_ROLES = new Set(['checkbox', 'radio', 'switch']);

/**
 * Runs one action of the test with the keyboard and records what happened on its line.
 * @param call Intercepted action.
 */
export async function handleAction(call: ActionCall): Promise<unknown> {
  const caller = findCaller(call.stack, OWN_DIR);
  return test.step(`${DISPLAY_NAMES[call.name]} (키보드)`, () => runWithKeyboard(call, caller), {
    // Not boxed: a boxed step hides the code line of the test from the error.
    box: false,
    ...(caller ? { location: caller } : {}),
  });
}

/**
 * Reaches the target with the keyboard and acts on it the way its kind of action needs.
 * @param call Intercepted action.
 * @param caller Line of the user's test that called the action.
 */
async function runWithKeyboard(call: ActionCall, caller: Caller | undefined): Promise<unknown> {
  const { name, frame, args } = call;
  const prefix = `${caller ? String(caller.line) : '?'}행 ${DISPLAY_NAMES[name]}`;
  if (name === 'dragAndDrop') {
    reserveLine(
      prefix,
      '검사하지 못함: 드래그는 키보드 대안이 필요한 동작이며 확인하지 못했습니다',
    );
    console.log(`[journey-a11y] ${describeCaller(caller)} dragTo — 키보드로 검사하지 못했습니다`);
    return call.runOriginal();
  }

  const options = readOptions(args.at(-1));
  const locator = frame.locator(call.selector);
  // `page.click(selector)` is not strict: like Playwright, it acts on the first match.
  const target = options.strict === true ? locator : locator.first();
  const page = frame.page();
  const setLine = reserveLine(prefix, '실패: 목표가 화면에 나타나지 않음');
  try {
    await target.waitFor({
      state: 'visible',
      ...(options.timeout === undefined ? {} : { timeout: options.timeout }),
    });
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

  const label = await describeElement(frame, result.answer);
  const moves = describeMoves(result);
  switch (name) {
    case 'click': {
      const key = SPACE_ROLES.has(roleOf(label)) ? 'Space' : 'Enter';
      await pressKey(page, key);
      setLine(`통과: ${moves}, ${label}에서 ${key}`);
      return undefined;
    }
    case 'fill': {
      await insertText(page, String(args[0]));
      setLine(`통과: ${moves}, ${label}에 글자 입력`);
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
  }
}

/**
 * Reads the options object of an action, which Playwright passes last and may leave out.
 * @param value Last argument of the action.
 */
function readOptions(value: unknown): ActionOptions {
  return typeof value === 'object' && value !== null ? value : {};
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
