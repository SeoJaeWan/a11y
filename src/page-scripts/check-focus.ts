/** Where focus is, seen from the answer element. */
export type FocusPlace = {
  /** Focus is on the answer, on another item of the answer's arrow-key group, or elsewhere. */
  at: 'answer' | 'group' | 'other';
  /** Focus was already here earlier in this search: one round is done. */
  isRepeat: boolean;
};

/**
 * Says where focus is and whether it has been there before.
 * An element named by `aria-activedescendant` counts as the focused one.
 * Runs in the page, so it uses nothing from outside.
 * @param answer Element the keyboard must reach.
 * @param seen Elements focus has already visited in this search.
 */
export function checkFocus(answer: Element, seen: WeakSet<Element>): FocusPlace {
  const active = document.activeElement ?? document.body;
  const pointedId = active.getAttribute('aria-activedescendant');
  const current = (pointedId ? document.getElementById(pointedId) : null) ?? active;
  const isRepeat = seen.has(current);
  seen.add(current);
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
    isInGroup = group?.contains(current) ?? false;
  }
  return { at: isInGroup ? 'group' : 'other', isRepeat };
}

/**
 * Creates the set that remembers visited elements. It lives in the page so elements can be compared.
 * Runs in the page, so it uses nothing from outside.
 */
export function createSeen(): WeakSet<Element> {
  return new WeakSet<Element>();
}
