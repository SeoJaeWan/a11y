import { defineE2eScenario } from '../../runner/define-scenario';

const E2E = 'e2e/cases/run';
// The next line's own `expect` fails, so the error is Playwright's and names the locator it waited for.
const STATUS_EXPECT_FAILED = "getByRole('status')";

export const scenario = defineE2eScenario({
  name: '실행',
  cases: [
    {
      id: 'space-only-div-button',
      situation: 'Space만 처리하는 `div role="button"`',
      e2e: `${E2E}/space-only-div-button.spec.ts`,
      expected: {
        status: 'failed',
        error: STATUS_EXPECT_FAILED,
        lines: ['5행 click 통과: Tab 4번, button "창가 좌석 선택"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'no-key-div-button',
      situation: '키 처리가 없는 `div role="button"`',
      e2e: `${E2E}/no-key-div-button.spec.ts`,
      expected: {
        status: 'failed',
        error: STATUS_EXPECT_FAILED,
        lines: ['5행 click 통과: Tab 4번, button "알림 받기"에서 Enter'],
        notices: [],
      },
    },
    {
      id: 'text-input',
      situation: '입력창',
      e2e: `${E2E}/text-input.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 fill 통과: Tab 4번, textbox "예약자 이름"에 닿음, 값은 원래 방식으로 입력'],
        notices: [],
      },
    },
    {
      id: 'checkbox',
      situation: '체크박스',
      e2e: `${E2E}/checkbox.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 check 통과: Tab 4번, checkbox "약관에 동의합니다"에서 Space'],
        notices: [],
      },
    },
    {
      id: 'radio-arrow',
      situation: '라디오 버튼',
      e2e: `${E2E}/radio-arrow.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 check 통과: Tab 4번, ↓ 2번, radio "새벽 배송" 선택'],
        notices: [],
      },
    },
    {
      id: 'select-option',
      situation: '`selectOption`',
      e2e: `${E2E}/select-option.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 selectOption 통과: Tab 4번, combobox "인원"에 닿음, 값은 원래 방식으로 선택'],
        notices: [],
      },
    },
    {
      id: 'hover-focus-button',
      situation: '`hover` 뒤 버튼, 포커스로도 나타남',
      e2e: `${E2E}/hover-focus-button.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 hover 통과: Tab 4번, button "계정"으로 포커스 이동',
          '6행 click 통과: Tab 1번, button "로그아웃"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'hover-mouse-only-button',
      situation: '`hover` 뒤 버튼, 마우스에만 나타남',
      e2e: `${E2E}/hover-mouse-only-button.spec.ts`,
      expected: {
        status: 'failed',
        error: "getByRole('button', { name: '로그아웃' })",
        lines: [
          '5행 hover 통과: Tab 4번, button "계정"으로 포커스 이동',
          '6행 click 실패: 목표가 화면에 나타나지 않음',
        ],
        notices: [],
      },
    },
    {
      id: 'drag-to',
      situation: '`dragTo`',
      e2e: `${E2E}/drag-to.spec.ts`,
      expected: {
        status: 'failed',
        error: '키보드로 실행할 수 없는 동작입니다: dragTo',
        lines: ['5행 dragTo 실패: 키보드로 실행할 수 없는 동작'],
        notices: [],
      },
    },
    {
      id: 'drag-to-pass-unsupported',
      situation: '`dragTo`, 실행할 수 없는 동작을 통과로 설정',
      e2e: `${E2E}/drag-to.spec.ts`,
      config: 'playwright-pass-unsupported.config.ts',
      expected: {
        status: 'passed',
        lines: [
          '5행 dragTo 검사하지 못함: 드래그는 키보드 대안이 필요한 동작이며 확인하지 못했습니다',
          '6행 click 통과: Tab 1번, button "저장"에서 Enter',
        ],
        notices: [
          '[journey-a11y] cases/run/drag-to.spec.ts:5 dragTo — 키보드로 검사하지 못했습니다',
        ],
      },
    },
    {
      id: 'drag-with-alternative',
      situation: '`dragTo`, 주석이 대안 테스트를 가리킴',
      e2e: `${E2E}/drag-with-alternative.spec.ts`,
      expected: {
        status: 'skipped',
        skipped: '대안 테스트로 대체: 버튼으로 카드를 완료로 옮긴다',
        lines: [],
        notices: [],
      },
    },
    {
      id: 'move-with-button',
      situation: '드래그의 대안인 버튼으로 옮기는 테스트',
      e2e: `${E2E}/move-with-button.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, button "완료로 이동"에서 Enter',
          '6행 click 통과: Tab 1번, button "저장"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'drag-with-missing-alternative',
      situation: '`dragTo`, 주석이 가리킨 대안 테스트가 없음',
      e2e: `${E2E}/drag-with-missing-alternative.spec.ts`,
      expected: {
        status: 'failed',
        error: '주석이 가리킨 대안 테스트를 찾지 못했습니다: 메뉴로 카드를 완료로 옮긴다',
        lines: [],
        notices: [],
      },
    },
    {
      id: 'double-click-shortcut',
      situation: '`dblclick`, 요소가 `aria-keyshortcuts`로 키를 표시',
      e2e: `${E2E}/double-click-shortcut.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['5행 dblclick 통과: Tab 4번, listitem에서 Enter (aria-keyshortcuts)'],
        notices: [],
      },
    },
    {
      id: 'double-click-only',
      situation: '`dblclick`, 키 표시 없음',
      e2e: `${E2E}/double-click-only.spec.ts`,
      expected: {
        status: 'failed',
        error: '키보드로 실행할 수 없는 동작입니다: dblclick',
        lines: ['5행 dblclick 실패: 키보드로 실행할 수 없는 동작'],
        notices: [],
      },
    },
    {
      id: 'right-click-menu',
      situation: '우클릭으로 여는 메뉴',
      e2e: `${E2E}/right-click-menu.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, listitem에서 Shift+F10',
          '6행 click 통과: ↓ 1번, menuitem "예약 취소"에서 Enter',
        ],
        notices: [],
      },
      expectedOnMac: {
        status: 'failed',
        error:
          '키보드로 실행할 수 없는 동작입니다: 우클릭\nmacOS에는 우클릭 메뉴를 여는 키가 없습니다.',
        lines: ['5행 click 실패: 키보드로 실행할 수 없는 동작'],
        notices: [],
      },
    },
    {
      id: 'right-click-menu-pass-unsupported',
      situation: '우클릭으로 여는 메뉴, 실행할 수 없는 동작을 통과로 설정',
      e2e: `${E2E}/right-click-menu.spec.ts`,
      config: 'playwright-pass-unsupported.config.ts',
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, listitem에서 Shift+F10',
          '6행 click 통과: ↓ 1번, menuitem "예약 취소"에서 Enter',
        ],
        notices: [],
      },
      expectedOnMac: {
        status: 'passed',
        lines: [
          '5행 click 검사하지 못함: 키보드로 바꿔 실행하는 방법이 정해지지 않은 동작입니다',
          '6행 click 통과: ↓ 1번, menuitem "예약 취소"에서 Enter',
        ],
        notices: [
          '[journey-a11y] cases/run/right-click-menu.spec.ts:5 click — 키보드로 검사하지 못했습니다',
        ],
      },
    },
    {
      id: 'right-click-shortcut',
      situation: '우클릭, 요소가 `aria-keyshortcuts`로 키를 표시',
      e2e: `${E2E}/right-click-shortcut.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, listitem에서 Alt+M (aria-keyshortcuts)',
          '6행 click 통과: ↓ 1번, menuitem "예약 취소"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'right-click-menu-button',
      situation: '우클릭, 요소가 메뉴 버튼(`aria-haspopup="menu"`)',
      e2e: `${E2E}/right-click-menu-button.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 click 통과: Tab 4번, button "11월 20일 서울 호텔"에서 Enter (aria-haspopup)',
          '6행 click 통과: ↓ 1번, menuitem "예약 취소"에서 Enter',
        ],
        notices: [],
      },
    },
    {
      id: 'right-click-menu-button-other-action',
      situation: '우클릭, 메뉴 버튼 표시가 있지만 Enter가 메뉴를 열지 않음',
      e2e: `${E2E}/right-click-menu-button-other-action.spec.ts`,
      expected: {
        status: 'failed',
        error: 'Enter를 눌렀지만 메뉴(role="menu")가 열리지 않았습니다',
        lines: ['5행 click 실패: Enter를 눌렀지만 메뉴가 열리지 않음'],
        notices: [],
      },
    },
    {
      id: 'file-input',
      situation: '보이는 파일 입력란',
      e2e: `${E2E}/file-input.spec.ts`,
      expected: {
        status: 'passed',
        lines: [
          '5행 setInputFiles 통과: Tab 4번, button "프로필 사진"에서 Enter, 열린 선택 창에 파일을 넣음',
        ],
        notices: [],
      },
    },
    {
      id: 'file-input-label-only',
      situation: '숨긴 파일 입력란, 키 처리가 없는 `label`',
      e2e: `${E2E}/file-input-label-only.spec.ts`,
      expected: {
        status: 'failed',
        error: 'label "올리기"에서 Enter를 눌렀지만 파일 선택 창이 열리지 않았습니다',
        lines: ['5행 setInputFiles 실패: 파일 선택 창이 열리지 않음'],
        notices: [],
      },
    },
    {
      id: 'file-input-script-button',
      situation: '숨긴 파일 입력란, 연결된 `label` 없음',
      e2e: `${E2E}/file-input-script-button.spec.ts`,
      expected: {
        status: 'failed',
        error: '화면에 보이지 않고, 화면에 보이는 연결된 label도 없습니다',
        lines: ['5행 setInputFiles 실패: 닿을 수 없음'],
        notices: [],
      },
    },
    {
      id: 'file-chooser-button',
      situation: '파일 선택 창을 여는 버튼을 `click`',
      e2e: `${E2E}/file-chooser-button.spec.ts`,
      expected: {
        status: 'passed',
        lines: ['6행 click 통과: Tab 4번, button "올리기"에서 Enter'],
        notices: [],
      },
    },
  ],
});
