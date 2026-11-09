import { definePieceScenario } from '../../runner/define-scenario';
import type { JsonObject } from '../../runner/json';

const E2E = 'e2e/pieces/guess-key';

/**
 * One key attempt as `attempts` lists it.
 * @param key Playwright key name.
 * @param source Where the key came from.
 * @param nextStep Whether the next E2E step went on.
 * @param requests Server-changing requests sent after the key.
 */
function attempt(
  key: string,
  source: string,
  nextStep: string,
  requests: string[] = [],
): JsonObject {
  return { key, source, nextStep, requests };
}

/** Enter fails, Space goes on: the attempts of a Space-only `div role="button"`. */
const ENTER_THEN_SPACE = [
  attempt('Enter', 'role', 'not-continued'),
  attempt('Space', 'role', 'continued'),
];

export const scenario = definePieceScenario({
  name: '키를 추측해 실행한다',
  conditions: {
    action: {
      label: '동작과 대상',
      values: [
        'click: Space만 받는 div role="button"',
        'dblclick: 키 안내 없는 항목',
        'hover: 메뉴 버튼',
        '우클릭: 키 안내 없는 항목',
        'hover: 하위 메뉴가 있는 menuitem',
        'dblclick: 선언된 키(aria-keyshortcuts)',
        'dblclick: 선언된 키가 동작하지 않음',
        'setInputFiles: 옆 버튼이 여는 숨긴 입력',
        'setInputFiles: 묶음 안 둘째 버튼이 여는 숨긴 입력',
        'page.mouse.dblclick',
        'page.mouse.move',
      ],
      base: 'click: Space만 받는 div role="button"',
    },
    workingKey: {
      label: '이어지는 키',
      values: ['둘째 후보', '첫 후보', '없음'],
      base: '둘째 후보',
    },
    guessSteps: {
      label: '추측 단계 수',
      values: ['하나', '둘'],
      base: '하나',
    },
    nextStep: {
      label: '다음 단계',
      values: [
        '앞 동작의 결과 확인',
        '다음 단계 없음',
        '원래부터 참인 확인',
        '앞 동작과 무관한 확인',
      ],
      base: '앞 동작의 결과 확인',
    },
    requests: {
      label: '키 뒤의 서버 요청',
      values: ['없음', '맞는 키 뒤 변경 요청(POST)', '조회 요청(GET)만', '틀린 키 뒤 변경 요청'],
      base: '없음',
    },
  },
  cases: [
    {
      id: 'space-only-div-button',
      change: {},
      e2e: `${E2E}/space-only-div-button.spec.ts`,
      expected: {
        status: 'flaky',
        retry: 1,
        steps: [{ keyboard: { reached: true, attempts: ENTER_THEN_SPACE } }, {}],
      },
      todo: true,
    },
    {
      id: 'dblclick-edit',
      change: { action: 'dblclick: 키 안내 없는 항목' },
      e2e: `${E2E}/dblclick-edit.spec.ts`,
      expected: {
        status: 'flaky',
        retry: 1,
        steps: [
          {
            action: 'dblclick',
            keyboard: {
              reached: true,
              attempts: [
                attempt('Enter', 'generic', 'not-continued'),
                attempt('Space', 'generic', 'continued'),
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'hover-menu-button',
      change: { action: 'hover: 메뉴 버튼' },
      e2e: `${E2E}/hover-menu-button.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          {
            action: 'hover',
            keyboard: { reached: true, attempts: [attempt('Enter', 'role', 'continued')] },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'right-click',
      change: { action: '우클릭: 키 안내 없는 항목' },
      e2e: `${E2E}/right-click.spec.ts`,
      expected: {
        status: 'flaky',
        retry: 1,
        steps: [
          {
            action: 'click',
            keyboard: {
              reached: true,
              attempts: [
                attempt('Enter', 'generic', 'not-continued'),
                attempt('Space', 'generic', 'continued'),
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'hover-submenu-item',
      change: { action: 'hover: 하위 메뉴가 있는 menuitem' },
      e2e: `${E2E}/hover-submenu-item.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          {},
          {
            action: 'hover',
            keyboard: { reached: true, attempts: [attempt('ArrowRight', 'role', 'continued')] },
          },
          {},
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'declared-key',
      change: { action: 'dblclick: 선언된 키(aria-keyshortcuts)' },
      e2e: `${E2E}/declared-key.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          { keyboard: { reached: true, attempts: [attempt('F2', 'declared', 'continued')] } },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'declared-key-broken',
      change: { action: 'dblclick: 선언된 키가 동작하지 않음' },
      e2e: `${E2E}/declared-key-broken.spec.ts`,
      expected: {
        status: 'flaky',
        retry: 1,
        steps: [
          {
            keyboard: {
              reached: true,
              attempts: [
                attempt('F2', 'declared', 'not-continued'),
                attempt('Enter', 'generic', 'continued'),
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'file-button-beside',
      change: { action: 'setInputFiles: 옆 버튼이 여는 숨긴 입력' },
      e2e: `${E2E}/file-button-beside.spec.ts`,
      expected: { status: 'passed', retry: 0, steps: [{ action: 'setInputFiles' }, {}] },
      todo: true,
    },
    {
      id: 'file-button-second',
      change: { action: 'setInputFiles: 묶음 안 둘째 버튼이 여는 숨긴 입력' },
      e2e: `${E2E}/file-button-second.spec.ts`,
      expected: { status: 'flaky', retry: 1, steps: [{ action: 'setInputFiles' }, {}] },
      todo: true,
    },
    {
      id: 'enter-div-button',
      change: { workingKey: '첫 후보' },
      e2e: `${E2E}/enter-div-button.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          { keyboard: { reached: true, attempts: [attempt('Enter', 'role', 'continued')] } },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'two-guessed-steps',
      change: { guessSteps: '둘' },
      e2e: `${E2E}/two-guessed-steps.spec.ts`,
      expected: {
        status: 'flaky',
        retry: 2,
        steps: [
          { keyboard: { attempts: ENTER_THEN_SPACE } },
          {},
          { keyboard: { attempts: ENTER_THEN_SPACE } },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'no-next-step',
      change: { nextStep: '다음 단계 없음' },
      e2e: `${E2E}/no-next-step.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ keyboard: { attempts: [attempt('Enter', 'role', 'no-next-step')] } }],
      },
      todo: true,
    },
    {
      id: 'already-true-next',
      change: { nextStep: '원래부터 참인 확인' },
      e2e: `${E2E}/already-true-next.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ keyboard: { attempts: [attempt('Enter', 'role', 'continued')] } }, {}],
      },
      todo: true,
    },
    {
      id: 'post-request',
      change: { requests: '맞는 키 뒤 변경 요청(POST)' },
      e2e: `${E2E}/post-request.spec.ts`,
      expected: {
        status: 'flaky',
        retry: 1,
        steps: [
          {
            keyboard: {
              attempts: [
                attempt('Enter', 'role', 'not-continued'),
                attempt('Space', 'role', 'continued', ['POST /api/cart']),
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'get-request',
      change: { requests: '조회 요청(GET)만' },
      e2e: `${E2E}/get-request.spec.ts`,
      expected: {
        status: 'flaky',
        retry: 1,
        steps: [{ keyboard: { attempts: ENTER_THEN_SPACE } }, {}],
      },
      todo: true,
    },
  ],
  noCase: {
    action: {
      'page.mouse.dblclick':
        '좌표 동작은 목표를 추정한 뒤 dblclick()과 같은 규칙으로 실행한다. 목표 추정은 "키가 정해진 동작을 실행한다"의 page.mouse.click 케이스가, 키 추측은 dblclick 케이스가 확인한다.',
      'page.mouse.move':
        'move만 있으면 hover()와 같은 규칙으로 실행한다. 목표 추정은 page.mouse.click 케이스가, 키 추측은 hover 케이스가 확인한다.',
    },
    workingKey: {
      없음: '"진행하지 못하면 끝낸다"의 "후보 키 모두 실패" 케이스가 확인한다.',
    },
    nextStep: {
      '앞 동작과 무관한 확인':
        '원래부터 참인 확인과 같은 한계다. 다음 단계가 키의 효과를 보지 않아 첫 키가 이어진 것으로 남는 모습은 그 케이스가 확인한다.',
    },
    requests: {
      '틀린 키 뒤 변경 요청':
        '틀린 키가 서버를 바꾸고도 다음 단계가 실패하는 화면을 자연스럽게 만들기 어렵다. 요청은 키마다 같은 attempts[].requests 칸에 남으므로 맞는 키 뒤 POST 케이스로 기록 위치를 확인한다.',
    },
  },
});
