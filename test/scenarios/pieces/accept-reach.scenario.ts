import { definePieceScenario } from '../../runner/define-scenario';

export const scenario = definePieceScenario({
  name: '도달을 인정한다',
  conditions: {
    relation: {
      label: '포커스와 목표의 관계',
      values: ['같은 요소', '버튼 안 글자', 'label', '안의 입력 하나', '안의 링크 여럿'],
      base: '같은 요소',
    },
  },
  cases: [
    {
      id: 'same-element',
      change: {},
      e2e: 'e2e/pieces/accept-reach/same-element.spec.ts',
      expected: { steps: [{ keyboard: { reached: true, reachedBy: 'self' } }, {}] },
      todo: true,
    },
    {
      id: 'text-in-button',
      change: { relation: '버튼 안 글자' },
      e2e: 'e2e/pieces/accept-reach/text-in-button.spec.ts',
      expected: { steps: [{ keyboard: { reached: true, reachedBy: 'ancestor' } }, {}] },
      todo: true,
    },
    {
      id: 'label',
      change: { relation: 'label' },
      e2e: 'e2e/pieces/accept-reach/label.spec.ts',
      expected: { steps: [{ keyboard: { reached: true, reachedBy: 'label' } }, {}] },
      todo: true,
    },
    {
      id: 'one-input-inside',
      change: { relation: '안의 입력 하나' },
      e2e: 'e2e/pieces/accept-reach/one-input-inside.spec.ts',
      expected: { steps: [{ keyboard: { reached: true, reachedBy: 'descendant' } }, {}] },
      todo: true,
    },
    {
      id: 'many-links-inside',
      change: { relation: '안의 링크 여럿' },
      e2e: 'e2e/pieces/accept-reach/many-links-inside.spec.ts',
      expected: {
        status: 'failed',
        steps: [{ keyboard: { reached: false, stoppedBy: 'round', ended: true } }],
      },
      todo: true,
    },
  ],
  noCase: {},
});
