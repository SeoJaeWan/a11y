import type { ElementHandle, Frame } from '@playwright/test';

import { removeMark, setMark } from '../page-scripts/read-element';
import { toElementLabel } from './element-label';

const MARK = 'data-journey-a11y-answer';

/**
 * Reads the role and name of an element the way Playwright's `getByRole` sees them.
 * A locator is needed for that, so the element carries a temporary attribute while it is read.
 * @param frame Frame the element is in.
 * @param answer Element the keyboard reached.
 */
export async function describeElement(
  frame: Frame,
  answer: ElementHandle<Element>,
): Promise<string> {
  await answer.evaluate(setMark, MARK);
  try {
    return toElementLabel(await frame.locator(`[${MARK}]`).ariaSnapshot());
  } finally {
    await answer.evaluate(removeMark, MARK);
  }
}
