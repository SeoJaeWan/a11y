import { definePieceScenario } from '../../runner/define-scenario';

const E2E = 'e2e/pieces/stop-search';

export const scenario = definePieceScenario({
  name: '찾기를 멈춘다',
  conditions: {
    ending: {
      label: '멈추는 상황',
      values: ['한 바퀴', 'Tab 상한', '모달 안에 갇힘'],
      base: '한 바퀴',
    },
    maxTabs: {
      label: 'Tab 상한 설정',
      values: ['기본 50', '`maxTabs` 지정'],
      base: '기본 50',
    },
  },
  cases: [
    {
      id: 'round',
      change: {},
      e2e: `${E2E}/round.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: false,
              stoppedBy: 'round',
              startFocus: 'body',
              path: { tab: 6, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '수정', isTarget: false },
                { index: 2, role: 'button', name: '비밀번호 변경', isTarget: false },
                { index: 3, role: 'button', name: '알림 설정', isTarget: false },
                { index: 4, role: 'button', name: '로그아웃', isTarget: false },
              ],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'tab-limit',
      change: { ending: 'Tab 상한' },
      e2e: `${E2E}/tab-limit.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: false,
              stoppedBy: 'limit',
              path: { tab: 50, arrow: 0 },
              stops: [
                { index: 1, role: 'link', name: '상품 1', isTarget: false },
                { index: 50, role: 'link', name: '상품 50', isTarget: false },
              ],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'modal-trap',
      change: { ending: '모달 안에 갇힘' },
      e2e: `${E2E}/modal-trap.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: false,
              stoppedBy: 'round',
              startFocus: 'button "설정"',
              path: { tab: 3, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '모두 허용', isTarget: false },
                { index: 2, role: 'button', name: '설정', isTarget: false },
              ],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'max-tabs-option',
      change: { maxTabs: '`maxTabs` 지정' },
      e2e: `${E2E}/max-tabs-option.spec.ts`,
      config: 'playwright-max-tabs.config.ts',
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: false,
              stoppedBy: 'limit',
              path: { tab: 3, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '수정', isTarget: false },
                { index: 2, role: 'button', name: '비밀번호 변경', isTarget: false },
                { index: 3, role: 'button', name: '알림 설정', isTarget: false },
              ],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
  ],
  noCase: {},
});
