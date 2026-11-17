const SNAPSHOT_LINE = /^- ([^\s":]+)(?: "((?:[^"\\]|\\.)*)")?/;

/**
 * Turns the first line of an ARIA snapshot into `role "name"`, without states such as `[checked]`.
 * @param snapshot ARIA snapshot of one element, e.g. `- button "저장" [expanded]`.
 */
export function toElementLabel(snapshot: string): string {
  const match = SNAPSHOT_LINE.exec(snapshot.split('\n')[0] ?? '');
  if (!match) return '요소';
  const [, role = '요소', name] = match;
  return name === undefined ? role : `${role} "${name.replaceAll('\\"', '"')}"`;
}

/**
 * Reads the role of a label made by {@link toElementLabel}.
 * @param label Label such as `button "저장"`.
 */
export function roleOf(label: string): string {
  return label.split(' ')[0] ?? '';
}
