import { defineE2eScenario } from '../../runner/define-scenario';

export const scenario = defineE2eScenario({
  name: '흐름',
  cases: [
    {
      id: 'modal-moves-focus',
      situation: '모달이 열리며 포커스가 모달로 이동: 다음 단계 Tab 1',
      e2e: 'e2e/cases/flow/modal-moves-focus.spec.ts',
      expected: 'scenarios/cases/flow/modal-moves-focus.expected.json',
      todo: true,
    },
    {
      id: 'modal-keeps-focus',
      situation: '모달이 열려도 포커스가 그대로: 다음 단계 시작 포커스가 원래 버튼',
      e2e: 'e2e/cases/flow/modal-keeps-focus.spec.ts',
      expected: 'scenarios/cases/flow/modal-keeps-focus.expected.json',
      todo: true,
    },
    {
      id: 'page-load',
      situation: '페이지 이동 후: 시작 포커스 body',
      e2e: 'e2e/cases/flow/page-load.spec.ts',
      expected: 'scenarios/cases/flow/page-load.expected.json',
      todo: true,
    },
    {
      id: 'spa-focus-lost',
      situation: 'SPA 이동 후 포커스가 사라짐: `focusLost`, Tab은 사라진 요소 자리에서 시작',
      e2e: 'e2e/cases/flow/spa-focus-lost.spec.ts',
      expected: 'scenarios/cases/flow/spa-focus-lost.expected.json',
      todo: true,
    },
    {
      id: 'spa-heading-focus',
      situation: 'SPA 이동 후 새 화면 제목으로 포커스 이동: 시작 포커스가 제목',
      e2e: 'e2e/cases/flow/spa-heading-focus.spec.ts',
      expected: 'scenarios/cases/flow/spa-heading-focus.expected.json',
      todo: true,
    },
    {
      id: 'tab-order-differs',
      situation: 'Tab 순서가 화면 순서와 다름: 지나간 순서 그대로 기록',
      e2e: 'e2e/cases/flow/tab-order-differs.spec.ts',
      expected: 'scenarios/cases/flow/tab-order-differs.expected.json',
      todo: true,
    },
  ],
});
