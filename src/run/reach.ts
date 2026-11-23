import type { ElementHandle, Locator, Page } from '@playwright/test';

import { checkFocus, checkRound, createVisits } from '../page-scripts/check-focus';
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
 * Brings focus to the target of a locator with the keyboard.
 * @param target Element the test pointed at.
 */
export async function reach(target: Locator): Promise<Reach> {
  const element = await target.evaluateHandle((node) => node);
  return reachElement(target.page(), element.asElement());
}

/**
 * Brings focus to an element with the keyboard: Tab from where focus is, then arrow keys when
 * the element is an item of an arrow-key group. Stops when focus returns to a place it has
 * already been.
 * @param page Page the element is in.
 * @param target Element to reach.
 */
export async function reachElement(page: Page, target: ElementHandle<Element>): Promise<Reach> {
  const found = await target.evaluateHandle(findAnswer);
  const answer = found.asElement();
  if (!answer) return { kind: 'not-focusable', preview: await target.evaluate(previewElement) };

  let tabs = 0;
  const seenByTab = await answer.evaluateHandle(createVisits);
  // An answer inside an iframe sees only its own document, where focus rests on the body while
  // it goes round outside. The top document is watched too, so the search still ends.
  const top = page.mainFrame();
  const seenInTop =
    (await answer.ownerFrame()) === top ? undefined : await top.evaluateHandle(createVisits);
  if (seenInTop) await top.evaluate(checkRound, seenInTop);
  let place = await answer.evaluate(checkFocus, seenByTab);
  while (place.at === 'other') {
    await pressKey(page, 'Tab');
    tabs += 1;
    place = await answer.evaluate(checkFocus, seenByTab);
    const isTopRound = seenInTop ? await top.evaluate(checkRound, seenInTop) : false;
    if (place.at === 'other' && (place.isRepeat || isTopRound)) {
      return { kind: 'round', key: 'Tab', presses: tabs };
    }
  }

  let arrows = 0;
  const arrowKey = await answer.evaluate(findArrowKey);
  if (place.at === 'group') {
    const seenByArrow = await answer.evaluateHandle(createVisits);
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
