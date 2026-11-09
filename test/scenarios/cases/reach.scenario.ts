import { defineE2eScenario } from '../../runner/define-scenario';

export const scenario = defineE2eScenario({
  name: '도달',
  cases: [
    {
      id: 'plain-button',
      situation: '일반 버튼: Tab N으로 도달',
      e2e: 'e2e/cases/reach/plain-button.spec.ts',
      expected: 'scenarios/cases/reach/plain-button.expected.json',
      todo: true,
    },
  ],
});
