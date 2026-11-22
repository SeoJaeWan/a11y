/** Where focus is, seen from the answer element. */
export type FocusPlace = {
  /** Focus is on the answer, on another item of the answer's arrow-key group, or elsewhere. */
  at: 'answer' | 'group' | 'other';
  /** Focus was already here earlier in this search: one round is done. */
  isRepeat: boolean;
};

/** Elements focus has visited in one search, and the one it was on last. */
export type Visits = { seen: WeakSet<Element>; last: Element | null };

/**
 * Says where focus is and whether it has been there before.
 * An element named by `aria-activedescendant` counts as the focused one.
 * Runs in the page, so it uses nothing from outside.
 * @param answer Element the keyboard must reach.
 * @param visits Elements focus has already visited in this search.
 */
export function checkFocus(answer: Element, visits: Visits): FocusPlace {
  // The document the answer is in: its own frame's when the answer is inside an iframe.
  let active = answer.ownerDocument.activeElement ?? answer.ownerDocument.body;
  // Focus inside a shadow root shows on the document as its host; the real element is inside.
  while (active.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  const pointedId = active.getAttribute('aria-activedescendant');
  const pointed = pointedId ? (active.getRootNode() as Document).getElementById(pointedId) : null;
  const current = pointed ?? active;
  // One key can leave focus where it is, as inside a date field with several parts. Only coming
  // back to an element after being somewhere else is a round.
  const isRepeat = visits.seen.has(current) && visits.last !== current;
  visits.seen.add(current);
  visits.last = current;
  if (current === answer) return { at: 'answer', isRepeat };

  let isInGroup = false;
  if (answer instanceof HTMLInputElement && answer.type === 'radio') {
    isInGroup =
      current instanceof HTMLInputElement &&
      current.type === 'radio' &&
      current.name !== '' &&
      current.name === answer.name &&
      current.form === answer.form;
  } else if (
    answer.matches(
      '[role="option"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="tab"], [role="radio"]',
    )
  ) {
    const group = answer.closest(
      '[role="listbox"], [role="menu"], [role="menubar"], [role="tablist"], [role="radiogroup"]',
    );
    // A combobox or menu button keeps focus and names the list it drives with `aria-controls`.
    const controlled = `${active.getAttribute('aria-controls') ?? ''} ${active.getAttribute('aria-owns') ?? ''}`;
    isInGroup =
      group !== null &&
      (group.contains(current) || (group.id !== '' && controlled.split(/\s+/).includes(group.id)));
  }
  return { at: isInGroup ? 'group' : 'other', isRepeat };
}

/**
 * Says whether focus in the top document is back on an element it has already left. Used when
 * the answer is inside an iframe: the frame's own document cannot see focus going round outside.
 * Runs in the page, so it uses nothing from outside.
 * @param visits Elements of the top document focus has already visited in this search.
 */
export function checkRound(visits: Visits): boolean {
  let active = document.activeElement ?? document.body;
  while (active.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  const isRepeat = visits.seen.has(active) && visits.last !== active;
  visits.seen.add(active);
  visits.last = active;
  return isRepeat;
}

/**
 * Creates the record of visited elements. It lives in the page so elements can be compared.
 * Runs in the page, so it uses nothing from outside.
 */
export function createVisits(): Visits {
  return { seen: new WeakSet<Element>(), last: null };
}
