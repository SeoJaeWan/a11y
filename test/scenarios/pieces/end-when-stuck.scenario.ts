import { definePieceScenario } from '../../runner/define-scenario';

const E2E = 'e2e/pieces/end-when-stuck';

export const scenario = definePieceScenario({
  name: '진행하지 못하면 끝낸다',
  conditions: {
    cause: {
      label: '끝나는 이유',
      values: [
        '도달 못 함: 한 바퀴',
        '도달 못 함: Tab 상한',
        '후보 키 모두 실패',
        'dragTo',
        'page.mouse 끌기(down → move → up)',
        'page.mouse 좌표 아래 포커스 대상 없음(canvas)',
        '파일 창을 여는 후보 없음',
        '파일 창을 여는 후보 모두 실패',
      ],
      base: '도달 못 함: 한 바퀴',
    },
    position: {
      label: '막힌 단계의 위치',
      values: ['첫 동작', '앞 단계를 지난 뒤'],
      base: '첫 동작',
    },
  },
  cases: [
    {
      id: 'not-reached-round',
      change: {},
      e2e: `${E2E}/not-reached-round.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: false,
              stoppedBy: 'round',
              path: { tab: 3, arrow: 0 },
              attempts: [],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'not-reached-limit',
      change: { cause: '도달 못 함: Tab 상한' },
      e2e: `${E2E}/not-reached-limit.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: false,
              stoppedBy: 'limit',
              path: { tab: 50, arrow: 0 },
              attempts: [],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'keys-exhausted',
      change: { cause: '후보 키 모두 실패' },
      e2e: `${E2E}/keys-exhausted.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: true,
              attempts: [
                { key: 'Enter', source: 'role', nextStep: 'not-continued', requests: [] },
                { key: 'Space', source: 'role', nextStep: 'not-continued', requests: [] },
              ],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'drag-to',
      change: { cause: 'dragTo' },
      e2e: `${E2E}/drag-to.spec.ts`,
      expected: {
        status: 'failed',
        steps: [{ action: 'dragTo', keyboard: { attempts: [], ended: true } }],
      },
      todo: true,
    },
    {
      id: 'mouse-click-canvas',
      change: { cause: 'page.mouse 좌표 아래 포커스 대상 없음(canvas)' },
      e2e: `${E2E}/mouse-click-canvas.spec.ts`,
      expected: {
        status: 'failed',
        steps: [{ action: 'mouse.click', keyboard: { reached: false, attempts: [], ended: true } }],
      },
      todo: true,
    },
    {
      id: 'file-no-opener',
      change: { cause: '파일 창을 여는 후보 없음' },
      e2e: `${E2E}/file-no-opener.spec.ts`,
      expected: {
        status: 'failed',
        steps: [{ action: 'setInputFiles', keyboard: { reached: false, ended: true } }],
      },
      todo: true,
    },
    {
      id: 'file-openers-fail',
      change: { cause: '파일 창을 여는 후보 모두 실패' },
      e2e: `${E2E}/file-openers-fail.spec.ts`,
      expected: {
        status: 'failed',
        steps: [{ action: 'setInputFiles', keyboard: { reached: false, ended: true } }],
      },
      todo: true,
    },
    {
      id: 'stuck-after-steps',
      change: { position: '앞 단계를 지난 뒤' },
      e2e: `${E2E}/stuck-after-steps.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          { action: 'click', keyboard: { reached: true, ended: false } },
          { action: 'toBeVisible' },
          { action: 'click', keyboard: { reached: false, attempts: [], ended: true } },
        ],
      },
      todo: true,
    },
  ],
  noCase: {
    cause: {
      'page.mouse 끌기(down → move → up)':
        '끌기는 move·down·move·up 여러 호출에 걸쳐 판단되는데, 이 호출들이 단계 몇 개로 남고 어느 단계에서 끝나는지 문서가 정하지 않았다.',
    },
  },
});
