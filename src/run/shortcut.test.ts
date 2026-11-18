import { describe, expect, it } from 'vitest';

import { pickShortcut } from './shortcut';

describe('pickShortcut', () => {
  it('uses the only shortcut', () => {
    expect(pickShortcut('Enter')).toBe('Enter');
  });

  it('uses the first of several shortcuts', () => {
    expect(pickShortcut(' Control+E  F2 ')).toBe('Control+E');
  });

  it('gives nothing when the attribute is missing or empty', () => {
    expect(pickShortcut(null)).toBeUndefined();
    expect(pickShortcut('  ')).toBeUndefined();
  });
});
