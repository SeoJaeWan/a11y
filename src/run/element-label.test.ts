import { describe, expect, it } from 'vitest';

import { roleOf, toElementLabel } from './element-label';

// @codocs [[Journey A11y:결과]]
describe('요소의 종류와 이름', () => {
  it('종류와 이름을 읽는다', () => {
    expect(toElementLabel('- button "예약 확정"')).toBe('button "예약 확정"');
  });

  it('상태 표시와 자식 줄은 뺀다', () => {
    expect(toElementLabel('- button "계정" [expanded]')).toBe('button "계정"');
    expect(toElementLabel('- combobox "인원":\n  - option "1명" [selected]')).toBe(
      'combobox "인원"',
    );
  });

  it('이름이 없으면 종류만 쓴다', () => {
    expect(toElementLabel('- article:')).toBe('article');
  });

  it('라벨에서 종류를 꺼낸다', () => {
    expect(roleOf('checkbox "약관에 동의합니다"')).toBe('checkbox');
  });
});
