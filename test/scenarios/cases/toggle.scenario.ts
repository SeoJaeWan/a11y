import { defineE2eScenario } from '../../runner/define-scenario';

export const scenario = defineE2eScenario({
  name: '켜고 끄기',
  cases: [
    {
      id: 'a11y-off',
      situation: '접근성 실행을 켜지 않음',
      e2e: 'e2e/cases/toggle/a11y-off.spec.ts',
      env: { A11Y: null },
      expected: 'no-a11y-run',
    },
  ],
});
