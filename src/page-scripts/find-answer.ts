/**
 * Finds the element a keyboard user must reach to act on the target: the target itself or the
 * nearest element around it that can take focus. Nothing inside the target is searched.
 * Runs in the page, so it uses nothing from outside.
 * @param target Element the test pointed at.
 */
export function findAnswer(target: Element): Element | null {
  const item = target.closest(
    '[role="option"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="tab"], [role="radio"]',
  );
  const group = item?.closest(
    '[role="listbox"], [role="menu"], [role="menubar"], [role="tablist"], [role="radiogroup"]',
  );
  // An item of an arrow-key group is reached with arrows, even when it never takes focus itself.
  if (item && group) return item;
  const focusable = target.closest(
    'a[href], button, input:not([type="hidden"]), select, textarea, summary, [tabindex], [contenteditable=""], [contenteditable="true"]',
  );
  return focusable?.matches(':disabled') ? null : focusable;
}
