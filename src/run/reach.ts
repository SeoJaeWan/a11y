import type { ElementHandle, Locator } from '@playwright/test';

import { checkFocus, createSeen } from '../page-scripts/check-focus';
import { findAnswer } from '../page-scripts/find-answer';
import { findArrowKey, previewElement } from '../page-scripts/read-element';
import { pressKey } from './keys';
import type { ArrowKey, Moves } from './moves';

/** How bringing focus to the target ended. */
export type Reach =
  | ({ kind: 'reached'; answer: ElementHandle<Element> } & Moves)
  /** No element at or around the target can take focus. */
  | { kind: 'not-focusable'; preview: string }
  /** Focus went one full round without landing on the answer. */
  | { kind: 'round'; key: 'Tab' | ArrowKey; presses: number };

/**
 * Brings focus to the target with the keyboard: Tab from where focus is, then arrow keys when
 * the target is an item of an arrow-key group. Stops when focus returns to a place it has
 * already been.
 * @param target Element the test pointed at.
 */
export async function reach(target: Locator): Promise<Reach> {
  const page = target.page();
  const found = await target.evaluateHandle(findAnswer);
  const answer = found.asElement();
  if (!answer) return { kind: 'not-focusable', preview: await target.evaluate(previewElement) };

  let tabs = 0;
  const seenByTab = await answer.evaluateHandle(createSeen);
  let place = await answer.evaluate(checkFocus, seenByTab);
  while (place.at === 'other') {
    await pressKey(page, 'Tab');
    tabs += 1;
    place = await answer.evaluate(checkFocus, seenByTab);
    if (place.at === 'other' && place.isRepeat) return { kind: 'round', key: 'Tab', presses: tabs };
  }

  let arrows = 0;
  const arrowKey = await answer.evaluate(findArrowKey);
  if (place.at === 'group') {
    const seenByArrow = await answer.evaluateHandle(createSeen);
    place = await answer.evaluate(checkFocus, seenByArrow);
    while (place.at !== 'answer') {
      await pressKey(page, arrowKey);
      arrows += 1;
      place = await answer.evaluate(checkFocus, seenByArrow);
      // Leaving the group or coming back to an item means the arrows cannot get there.
      if (place.at === 'other' || (place.at === 'group' && place.isRepeat)) {
        return { kind: 'round', key: arrowKey, presses: arrows };
      }
    }
  }
  return { kind: 'reached', answer, tabs, arrows, arrowKey };
}
