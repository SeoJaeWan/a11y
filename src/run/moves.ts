const ARROW_SYMBOLS = { ArrowDown: '↓', ArrowRight: '→' } as const;

export type ArrowKey = keyof typeof ARROW_SYMBOLS;

/** Keys pressed to bring focus to the answer element. */
export type Moves = { tabs: number; arrows: number; arrowKey: ArrowKey };

/**
 * Writes the keys pressed on the way, e.g. `Tab 4번, ↓ 2번`. Tab is left out when only arrows
 * were needed, because focus was already inside the group.
 * @param moves Number of Tab and arrow presses.
 */
export function describeMoves({ tabs, arrows, arrowKey }: Moves): string {
  const parts: string[] = [];
  if (tabs > 0 || arrows === 0) parts.push(`Tab ${String(tabs)}번`);
  if (arrows > 0) parts.push(`${ARROW_SYMBOLS[arrowKey]} ${String(arrows)}번`);
  return parts.join(', ');
}

/**
 * Writes an arrow key as the symbol shown in results.
 * @param arrowKey Arrow key name.
 */
export function arrowSymbol(arrowKey: ArrowKey): string {
  return ARROW_SYMBOLS[arrowKey];
}
