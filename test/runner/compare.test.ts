import { describe, expect, it } from 'vitest';

import { expectedAttempts, pairStopsByIndex } from './compare';

// @codocs [[테스트 작성 규칙:기대값]]
describe('공통 조각 비교 준비', () => {
  it('stops를 index로 짝짓는다', () => {
    const record = { steps: [{ keyboard: { stops: [{ index: 1, role: 'link' }, { index: 4 }] } }] };
    expect(pairStopsByIndex(record)).toEqual({
      steps: [{ keyboard: { stops: { '#1': { index: 1, role: 'link' }, '#4': { index: 4 } } } }],
    });
  });

  it('적은 지점만 있어도 같은 index의 지점과 비교된다', () => {
    const actual = pairStopsByIndex({
      steps: [{ keyboard: { stops: [{ index: 1 }, { index: 2, name: 'a' }] } }],
    });
    const expected = pairStopsByIndex({
      steps: [{ keyboard: { stops: [{ index: 2, name: 'a' }] } }],
    });
    expect(actual).toMatchObject(expected as Record<string, unknown>);
  });

  it('attempts를 단계 번호와 함께 모은다', () => {
    const expected = { steps: [{}, { keyboard: { attempts: [{ key: 'Enter' }] } }] };
    expect(expectedAttempts(expected)).toEqual([{ step: 1, attempts: [{ key: 'Enter' }] }]);
  });
});
