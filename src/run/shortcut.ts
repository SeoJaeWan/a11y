/**
 * Picks the key to press from an `aria-keyshortcuts` value. The attribute may list several
 * shortcuts separated by spaces; the first one is used.
 * @param value Attribute value, e.g. `Enter` or `Control+E F2`, or nothing when it is not set.
 */
export function pickShortcut(value: string | null): string | undefined {
  const [first] = (value ?? '').trim().split(/\s+/);
  return first === '' ? undefined : first;
}
