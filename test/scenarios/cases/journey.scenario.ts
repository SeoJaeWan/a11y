import { defineE2eScenario } from '../../runner/define-scenario';

const E2E = 'e2e/cases/journey';
const FILLED = '값은 원래 방식으로 입력';
const NOT_CHECKED = '검사하지 못함: 키보드로 바꿔 실행하는 방법이 정해지지 않은 동작입니다';

export const scenario = defineE2eScenario({
  name: '여정',
  cases: [
    {
      id: 'profile-edit',
      situation: '프로필 수정',
      e2e: `${E2E}/profile-edit.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          `5행 fill 통과: Tab 4번, textbox "이름"에 닿음, ${FILLED}`,
          `6행 fill 통과: Tab 1번, textbox "소개"에 닿음, ${FILLED}`,
          '7행 click 통과: Tab 1번, button "저장"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'search-to-booking',
      situation: '검색에서 예약 시작까지',
      e2e: `${E2E}/search-to-booking.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          `5행 fill 통과: Tab 4번, combobox "여행지 검색"에 닿음, ${FILLED}`,
          '6행 click 통과: ↓ 2번, option "제주 서귀포"에서 Enter',
          '7행 click 통과: Tab 1번, link "바다 호텔"에서 Enter',
          '8행 click 통과: Tab 4번, button "예약하기"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'booking-payment',
      situation: '예약에서 결제까지',
      e2e: `${E2E}/booking-payment.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          `5행 fill 통과: Tab 4번, textbox "체크인"에 닿음, ${FILLED}`,
          '6행 selectOption 통과: Tab 4번, combobox "인원"에 닿음, 값은 원래 방식으로 선택',
          '7행 check 통과: Tab 1번, ↓ 1번, radio "카드 결제" 선택',
          '8행 check 통과: Tab 1번, checkbox "약관에 동의합니다"에서 Space',
          '9행 click 통과: Tab 1번, button "결제하기"에서 Enter',
          '10행 click 통과: Tab 0번, button "확인"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'admin-bookings',
      situation: '로그인이 필요한 관리 화면',
      e2e: `${E2E}/admin-bookings.spec.ts`,
      config: 'playwright-login.config.ts',
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, button "더보기"에서 Enter',
          '6행 click 통과: ↓ 1번, menuitem "예약 취소"에서 Enter',
          '7행 click 통과: Tab 0번, button "취소 확정"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'review-write',
      situation: '후기 작성',
      e2e: `${E2E}/review-write.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          `6행 dblclick ${NOT_CHECKED}`,
          `7행 fill 통과: Tab 1번, textbox "후기 내용"에 닿음, ${FILLED}`,
          '8행 setInputFiles 통과: Tab 1번, button "사진 첨부"에서 Enter, 열린 선택 창에 파일을 넣음',
          '9행 click 통과: Tab 1번, button "등록"에서 Enter',
        ],
        notices: [
          '[journey-a11y] cases/journey/review-write.spec.ts:6 dblclick — 키보드로 검사하지 못했습니다',
        ],
      },
    },
  ],
});
