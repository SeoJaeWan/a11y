import { describe, expect, it } from 'vitest';

import { describeMoves } from './moves';

// @codocs [[Journey A11y:결과]]
describe('누른 키 적기', () => {
  it('Tab만 눌렀으면 Tab 횟수를 적는다', () => {
    expect(describeMoves({ tabs: 4, arrows: 0, arrowKey: 'ArrowDown' })).toBe('Tab 4번');
  });

  it('Tab 뒤에 방향키를 눌렀으면 둘 다 적는다', () => {
    expect(describeMoves({ tabs: 4, arrows: 2, arrowKey: 'ArrowRight' })).toBe('Tab 4번, → 2번');
  });

  it('이미 묶음 안이라 방향키만 눌렀으면 방향키만 적는다', () => {
    expect(describeMoves({ tabs: 0, arrows: 2, arrowKey: 'ArrowDown' })).toBe('↓ 2번');
  });

  it('포커스가 이미 목표에 있으면 Tab 0번으로 적는다', () => {
    expect(describeMoves({ tabs: 0, arrows: 0, arrowKey: 'ArrowDown' })).toBe('Tab 0번');
  });
});
