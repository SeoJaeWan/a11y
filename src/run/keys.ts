import type { CDPSession, Page } from '@playwright/test';

const KEYS = {
  Tab: { key: 'Tab', code: 'Tab', keyCode: 9, text: undefined, isShifted: false },
  Enter: { key: 'Enter', code: 'Enter', keyCode: 13, text: '\r', isShifted: false },
  Space: { key: ' ', code: 'Space', keyCode: 32, text: ' ', isShifted: false },
  ArrowDown: {
    key: 'ArrowDown',
    code: 'ArrowDown',
    keyCode: 40,
    text: undefined,
    isShifted: false,
  },
  ArrowRight: {
    key: 'ArrowRight',
    code: 'ArrowRight',
    keyCode: 39,
    text: undefined,
    isShifted: false,
  },
  // Opens the context menu of the focused element, as a right click does with the mouse.
  'Shift+F10': { key: 'F10', code: 'F10', keyCode: 121, text: undefined, isShifted: true },
} as const;

const SHIFT = { key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 } as const;
/** Bit DevTools uses for a held Shift key. */
const SHIFT_MODIFIER = 8;

export type KeyName = keyof typeof KEYS;

const sessions = new WeakMap<Page, Promise<CDPSession>>();

/**
 * Opens one DevTools session per page. Keys sent this way reach the page as real key presses
 * without adding a step to the report for every Tab.
 * @param page Page to send keys to.
 */
function sessionOf(page: Page): Promise<CDPSession> {
  let session = sessions.get(page);
  if (!session) {
    session = page.context().newCDPSession(page);
    sessions.set(page, session);
  }
  return session;
}

/**
 * Presses and releases one key on the page.
 * @param page Page that has focus.
 * @param name Key to press.
 */
export async function pressKey(page: Page, name: KeyName): Promise<void> {
  const session = await sessionOf(page);
  const { key, code, keyCode, text, isShifted } = KEYS[name];
  const modifiers = isShifted ? SHIFT_MODIFIER : 0;
  if (isShifted) {
    await session.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...SHIFT, modifiers });
  }
  await session.send('Input.dispatchKeyEvent', {
    type: text === undefined ? 'rawKeyDown' : 'keyDown',
    key,
    code,
    windowsVirtualKeyCode: keyCode,
    modifiers,
    ...(text === undefined ? {} : { text }),
  });
  await session.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key,
    code,
    windowsVirtualKeyCode: keyCode,
    modifiers,
  });
  if (isShifted) await session.send('Input.dispatchKeyEvent', { type: 'keyUp', ...SHIFT });
}
