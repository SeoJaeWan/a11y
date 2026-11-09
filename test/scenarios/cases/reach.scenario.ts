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
    {
      id: 'cross-origin-iframe',
      situation:
        '다른 출처 iframe 안 결제 버튼: 프레임 안팎을 Tab으로 지나 도달, 지점에 프레임 표시',
      e2e: 'e2e/cases/reach/cross-origin-iframe.spec.ts',
      expected: 'scenarios/cases/reach/cross-origin-iframe.expected.json',
      todo: true,
    },
    {
      id: 'open-shadow-dom',
      situation: '열린 shadow DOM 안 버튼: 도달',
      e2e: 'e2e/cases/reach/open-shadow-dom.spec.ts',
      expected: 'scenarios/cases/reach/open-shadow-dom.expected.json',
      todo: true,
    },
    {
      id: 'closed-shadow-dom',
      situation: '닫힌 shadow DOM 버튼: 지나가는 지점으로 이름까지 기록',
      e2e: 'e2e/cases/reach/closed-shadow-dom.spec.ts',
      expected: 'scenarios/cases/reach/closed-shadow-dom.expected.json',
      todo: true,
    },
    {
      id: 'click-only-div',
      situation: '`div`에 클릭만 붙인 요소: 한 바퀴 뒤 도달 못 함, 실패로 종료',
      e2e: 'e2e/cases/reach/click-only-div.spec.ts',
      expected: 'scenarios/cases/reach/click-only-div.expected.json',
      todo: true,
    },
    {
      id: 'negative-tabindex-button',
      situation: '`tabindex="-1"` 버튼: 한 바퀴 뒤 도달 못 함, 실패로 종료',
      e2e: 'e2e/cases/reach/negative-tabindex-button.spec.ts',
      expected: 'scenarios/cases/reach/negative-tabindex-button.expected.json',
      todo: true,
    },
    {
      id: 'standard-tabs',
      situation: '표준 탭 메뉴: Tab과 방향키로 도달',
      e2e: 'e2e/cases/reach/standard-tabs.spec.ts',
      expected: 'scenarios/cases/reach/standard-tabs.expected.json',
      todo: true,
    },
    {
      id: 'tabs-without-roles',
      situation: 'role 없이 만든 탭: 도달 못 함',
      e2e: 'e2e/cases/reach/tabs-without-roles.spec.ts',
      expected: 'scenarios/cases/reach/tabs-without-roles.expected.json',
      todo: true,
    },
    {
      id: 'modal-trap',
      situation: '모달 안에 갇힘: 모달 안 한 바퀴 뒤 도달 못 함',
      e2e: 'e2e/cases/reach/modal-trap.spec.ts',
      expected: 'scenarios/cases/reach/modal-trap.expected.json',
      todo: true,
    },
    {
      id: 'text-in-button',
      situation: '버튼 안 글자를 지목: `ancestor`로 도달',
      e2e: 'e2e/cases/reach/text-in-button.spec.ts',
      expected: 'scenarios/cases/reach/text-in-button.expected.json',
      todo: true,
    },
    {
      id: 'data-qa-test-id',
      situation:
        "`testIdAttribute: 'data-qa'`인 프로젝트에서 `getByTestId`로 지목: 원래 실행과 같은 요소에 도달",
      e2e: 'e2e/cases/reach/data-qa-test-id.spec.ts',
      expected: 'scenarios/cases/reach/data-qa-test-id.expected.json',
      config: 'playwright-data-qa.config.ts',
      todo: true,
    },
    {
      id: 'card-with-two-links',
      situation: '링크 둘이 든 카드: 도달 못 함',
      e2e: 'e2e/cases/reach/card-with-two-links.spec.ts',
      expected: 'scenarios/cases/reach/card-with-two-links.expected.json',
      todo: true,
    },
  ],
});
