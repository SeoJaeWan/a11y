import type { ElementHandle, Frame } from '@playwright/test';

import { removeMark, setMark } from '../page-scripts/read-element';
import { toElementLabel } from './element-label';

const MARK = 'data-journey-a11y-answer';

/**
 * Reads the role and name of an element the way Playwright's `getByRole` sees them.
 * A locator is needed for that, so the element carries a temporary attribute while it is read.
 * @param frame Frame the action was called on. The element may be in a frame inside it.
 * @param answer Element the keyboard reached.
 */
export async function describeElement(
  frame: Frame,
  answer: ElementHandle<Element>,
): Promise<string> {
  // A locator looks in one frame only, so it must start from the frame the element is in.
  const ownFrame = (await answer.ownerFrame()) ?? frame;
  await answer.evaluate(setMark, MARK);
  try {
    return toElementLabel(await ownFrame.locator(`[${MARK}]`).ariaSnapshot());
  } finally {
    await answer.evaluate(removeMark, MARK);
  }
}

/**
 * Names the iframe an element is in, as a prefix for its label: `iframe "결제 창" 안의 `.
 * Empty for an element in the top document. An iframe without a `title` gets no name.
 * @param answer Element the keyboard reached.
 */
export async function describeFrame(answer: ElementHandle<Element>): Promise<string> {
  const ownFrame = await answer.ownerFrame();
  if (!ownFrame?.parentFrame()) return '';
  const title = await (await ownFrame.frameElement()).getAttribute('title');
  return title ? `iframe "${title}" 안의 ` : 'iframe 안의 ';
}
