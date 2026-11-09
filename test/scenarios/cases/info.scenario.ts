import { defineE2eScenario } from '../../runner/define-scenario';

export const scenario = defineE2eScenario({
  name: '전달되는 정보',
  cases: [
    {
      id: 'icon-button',
      situation: '아이콘만 있고 이름이 없는 버튼: 이름 없음, 요약에 개수',
      e2e: 'e2e/cases/info/icon-button.spec.ts',
      expected: 'scenarios/cases/info/icon-button.expected.json',
      todo: true,
    },
    {
      id: 'menu-button-no-expanded',
      situation: '`aria-expanded`가 없는 메뉴 버튼: 상태 칸이 비어 있음',
      e2e: 'e2e/cases/info/menu-button-no-expanded.spec.ts',
      expected: 'scenarios/cases/info/menu-button-no-expanded.expected.json',
      todo: true,
    },
    {
      id: 'name-sources',
      situation: '이름 출처: 글자, `aria-label`, `label`',
      e2e: 'e2e/cases/info/name-sources.spec.ts',
      expected: 'scenarios/cases/info/name-sources.expected.json',
      todo: true,
    },
    {
      id: 'landmarks-headings',
      situation: '랜드마크와 가까운 제목',
      e2e: 'e2e/cases/info/landmarks-headings.spec.ts',
      expected: 'scenarios/cases/info/landmarks-headings.expected.json',
      todo: true,
    },
  ],
});
