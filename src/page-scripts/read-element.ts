/**
 * Picks the arrow key that moves through the answer's group: right for a horizontal tab list or
 * menu bar, down for everything else.
 * Runs in the page, so it uses nothing from outside.
 * @param answer Item of an arrow-key group.
 */
export function findArrowKey(answer: Element): 'ArrowDown' | 'ArrowRight' {
  const group = answer.closest('[role="tablist"], [role="menubar"]');
  if (!group) return 'ArrowDown';
  return group.getAttribute('aria-orientation') === 'vertical' ? 'ArrowDown' : 'ArrowRight';
}

/**
 * Writes the opening tag of an element, for error messages.
 * Runs in the page, so it uses nothing from outside.
 * @param element Element to show.
 */
export function previewElement(element: Element): string {
  const html = (element.cloneNode(false) as Element).outerHTML;
  return html.slice(0, html.indexOf('>') + 1);
}

/**
 * Says whether a checkbox or radio is on, native or ARIA.
 * Runs in the page, so it uses nothing from outside.
 * @param element Checkbox or radio element.
 */
export function isChecked(element: Element): boolean {
  if (element instanceof HTMLInputElement) return element.checked;
  return element.getAttribute('aria-checked') === 'true';
}

/**
 * Puts a temporary attribute on an element so a locator can find it.
 * Runs in the page, so it uses nothing from outside.
 * @param element Element to mark.
 * @param name Attribute name.
 */
export function setMark(element: Element, name: string): void {
  element.setAttribute(name, '');
}

/**
 * Removes the temporary attribute again.
 * Runs in the page, so it uses nothing from outside.
 * @param element Marked element.
 * @param name Attribute name.
 */
export function removeMark(element: Element, name: string): void {
  element.removeAttribute(name);
}

/**
 * Reads the text of a `label` element, or nothing for any other element. A label has no role
 * of its own, so results name it by its tag.
 * Runs in the page, so it uses nothing from outside.
 * @param element Element the keyboard reached.
 */
export function readLabelText(element: Element): string | null {
  return element instanceof HTMLLabelElement ? element.textContent.trim() : null;
}

/**
 * Reads the `aria-keyshortcuts` of the target or of the nearest element around it that has one.
 * Runs in the page, so it uses nothing from outside.
 * @param target Element the test pointed at.
 */
export function findKeyShortcuts(target: Element): string | null {
  return target.closest('[aria-keyshortcuts]')?.getAttribute('aria-keyshortcuts') ?? null;
}

/** Tells whether the browser runs on macOS, where no key opens the context menu. */
export function isMacBrowser(): boolean {
  return navigator.platform.startsWith('Mac');
}
