import { defineE2eScenario } from '../../runner/define-scenario';

const E2E = 'e2e/cases/reach';
const NOT_FOCUSABLE = '포커스를 받을 수 없는 요소입니다';
const TAB_ROUND = 'Tab을 한 바퀴';

export const scenario = defineE2eScenario({
  name: '도달',
  cases: [
    {
      id: 'plain-button',
      situation: '일반 버튼',
      e2e: `${E2E}/plain-button.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 click 통과: Tab 4번, button "예약 확정"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'text-in-button',
      situation: '버튼 안 글자를 지목',
      e2e: `${E2E}/text-in-button.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 click 통과: Tab 4번, button "장바구니 담기"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'button-in-card',
      situation: '포커스 가능한 카드 안의 버튼을 지목',
      e2e: `${E2E}/button-in-card.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 click 통과: Tab 5번, button "찜하기"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'click-only-div',
      situation: '`div`에 클릭만 붙인 요소',
      e2e: `${E2E}/click-only-div.spec.ts`,
      expected: {
        status: 'failed',
        error: NOT_FOCUSABLE,
        lines: ['5행 click 실패: 닿을 수 없음'],
        notices: [],
      },
    },
    {
      id: 'negative-tabindex-button',
      situation: '`tabindex="-1"` 버튼',
      e2e: `${E2E}/negative-tabindex-button.spec.ts`,
      expected: {
        status: 'failed',
        error: TAB_ROUND,
        lines: ['5행 click 실패: 닿을 수 없음'],
        notices: [],
      },
    },
    {
      id: 'card-with-two-links',
      situation: '링크가 든 카드 `div`를 지목',
      e2e: `${E2E}/card-with-two-links.spec.ts`,
      expected: {
        status: 'failed',
        error: NOT_FOCUSABLE,
        lines: ['5행 click 실패: 닿을 수 없음'],
        notices: [],
      },
    },
    {
      id: 'standard-tabs',
      situation: '표준 탭 메뉴(`tablist`)',
      e2e: `${E2E}/standard-tabs.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 click 통과: Tab 4번, → 2번, tab "리뷰"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'tabs-without-roles',
      situation: '묶음 표시 없이 만든 탭',
      e2e: `${E2E}/tabs-without-roles.spec.ts`,
      expected: {
        status: 'failed',
        error: TAB_ROUND,
        lines: ['5행 click 실패: 닿을 수 없음'],
        notices: [],
      },
    },
    {
      id: 'modal-moves-focus',
      situation: '열리면서 포커스를 옮기는 확인 창',
      e2e: `${E2E}/modal-moves-focus.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, button "예약 취소"에서 Enter',
          '6행 click 통과: Tab 1번, button "취소 확정"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'modal-keeps-focus',
      situation: '포커스를 옮기지 않는 확인 창',
      e2e: `${E2E}/modal-keeps-focus.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, button "예약 취소"에서 Enter',
          '6행 click 통과: Tab 3번, button "취소 확정"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'modal-unreachable',
      situation: 'Tab으로 들어갈 수 없는 확인 창',
      e2e: `${E2E}/modal-unreachable.spec.ts`,
      expected: {
        status: 'failed',
        error: TAB_ROUND,
        lines: [
          '5행 click 통과: Tab 4번, button "예약 취소"에서 Enter',
          '6행 click 실패: 닿을 수 없음',
        ],
        notices: [],
      },
    },
    {
      id: 'listbox-focus',
      situation: '직접 만든 목록, 포커스가 옮겨 가는 방식',
      e2e: `${E2E}/listbox-focus.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, button "객실 등급"에서 Enter',
          '6행 click 통과: ↓ 2번, option "스위트"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'listbox-active-descendant',
      situation: '직접 만든 목록, `aria-activedescendant` 방식',
      e2e: `${E2E}/listbox-active-descendant.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, button "정렬"에서 Enter',
          '6행 click 통과: ↓ 2번, option "높은 가격순"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'list-without-roles',
      situation: '묶음 표시 없는 목록의 항목',
      e2e: `${E2E}/list-without-roles.spec.ts`,
      expected: {
        status: 'failed',
        error: NOT_FOCUSABLE,
        lines: ['5행 click 통과: Tab 4번, button "정렬"에서 Enter', '6행 click 실패: 닿을 수 없음'],
        notices: [],
      },
    },
    {
      id: 'button-in-iframe',
      situation: 'iframe 안의 버튼',
      e2e: `${E2E}/button-in-iframe.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 click 통과: Tab 4번, iframe "결제 창" 안의 button "결제하기"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'button-in-untitled-iframe',
      situation: '`title` 없는 iframe 안의 버튼',
      e2e: `${E2E}/button-in-untitled-iframe.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 click 통과: Tab 4번, iframe 안의 button "결제하기"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'negative-tabindex-in-iframe',
      situation: 'iframe 안의 `tabindex="-1"` 버튼',
      e2e: `${E2E}/negative-tabindex-in-iframe.spec.ts`,
      expected: {
        status: 'failed',
        error: 'Tab을 한 바퀴(5번) 눌렀지만 목표에 포커스가 오지 않았습니다',
        lines: ['5행 click 실패: 닿을 수 없음'],
        notices: [],
      },
    },
    {
      id: 'button-in-shadow-dom',
      situation: 'shadow DOM 안의 버튼',
      e2e: `${E2E}/button-in-shadow-dom.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 click 통과: Tab 4번, button "소식 받기"에서 Enter'],
        notices: [],
      },
    },
  ],
});
