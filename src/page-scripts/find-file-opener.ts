/**
 * Finds the element a keyboard user presses to open the file dialog of a file input: the input
 * itself when it is on screen, otherwise a label on screen that the HTML ties to it. A button
 * that opens the input from script leaves no trace in the HTML, so it is not found.
 * Runs in the page, so it uses nothing from outside.
 * @param target Element the test pointed at: a file input or a label of one.
 */
export function findFileOpener(target: Element): Element | null {
  /**
   * Says whether an element takes up space on screen and is not hidden by `visibility`.
   * @param element Element to look at.
   */
  function isShown(element: Element): boolean {
    const box = element.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && getComputedStyle(element).visibility === 'visible';
  }
  const input = target instanceof HTMLLabelElement ? target.control : target;
  if (!input) return null;
  if (isShown(input)) return input;
  if (!(input instanceof HTMLInputElement)) return null;
  return [...(input.labels ?? [])].find(isShown) ?? null;
}
