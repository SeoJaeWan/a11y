import { definePieceScenario } from '../../runner/define-scenario';

const E2E = 'e2e/pieces/leave-results';
const FILE = 'pieces/leave-results';

/** What the runner would need to check report output, appended to each such reason. */
const NEEDS_REPORT =
  '실행기가 아직 확인하지 못함: 실행기는 a11y-results.json의 테스트 기록만 비교한다. 안쪽 실행의 Playwright JSON 리포트에서';

export const scenario = definePieceScenario({
  name: '결과를 남긴다',
  conditions: {
    shape: {
      label: '테스트 모양',
      values: [
        '버튼 하나 누르고 확인',
        'describe 안의 테스트',
        '이름 없는 지점',
        '도달 못 한 단계',
        '여러 단계',
        '대기와 값 읽기가 섞임',
        '같은 지점을 여러 단계가 지남',
        '재실행된 테스트',
      ],
      base: '버튼 하나 누르고 확인',
    },
    output: {
      label: '남기는 곳',
      values: [
        'JSON 테스트 기록',
        'JSON 파일 머리(schemaVersion, tool, environment)',
        'JSON 버전 1에서 빼는 필드',
        '리포트 단계 제목',
        '리포트 지점 자식 단계',
        '리포트 실행 키와 앞 회차 실패 키',
        '요약 annotation',
        '다음 단계 없음 annotation',
        '이미지',
        '도달 못 함 실패 메시지',
        '재실행 메시지',
        '재실행 전제 힌트',
        'trace의 Tab 지점 스냅샷',
      ],
      base: 'JSON 테스트 기록',
    },
  },
  cases: [
    {
      id: 'base',
      change: {},
      e2e: `${E2E}/base.spec.ts`,
      expected: {
        file: `${FILE}/base.spec.ts`,
        title: ['저장 버튼을 누른다'],
        status: 'passed',
        retry: 0,
        summary: { tabs: 1, unnamed: 0, unreached: 0 },
        steps: [
          {
            action: 'click',
            target: 'button "저장"',
            location: `${FILE}/base.spec.ts:6`,
            keyboard: { reached: true, path: { tab: 1, arrow: 0 }, ended: false },
          },
          { action: 'toHaveText', target: 'status', location: `${FILE}/base.spec.ts:7` },
        ],
      },
      todo: true,
    },
    {
      id: 'in-describe',
      change: { shape: 'describe 안의 테스트' },
      e2e: `${E2E}/in-describe.spec.ts`,
      expected: {
        file: `${FILE}/in-describe.spec.ts`,
        title: ['장바구니', '수량을 늘린다'],
        steps: [
          { location: `${FILE}/in-describe.spec.ts:7` },
          { location: `${FILE}/in-describe.spec.ts:8` },
        ],
      },
      todo: true,
    },
    {
      id: 'unnamed-stops',
      change: { shape: '이름 없는 지점' },
      e2e: `${E2E}/unnamed-stops.spec.ts`,
      expected: {
        summary: { tabs: 3, unnamed: 2, unreached: 0 },
        steps: [
          {
            keyboard: {
              stops: [
                { index: 1, role: 'button', name: '', nameSource: null },
                { index: 2, role: 'button', name: '', nameSource: null },
                { index: 3, role: 'button', name: '사진 저장', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'unreached-step',
      change: { shape: '도달 못 한 단계' },
      e2e: `${E2E}/unreached-step.spec.ts`,
      expected: {
        status: 'failed',
        summary: { tabs: 3, unnamed: 0, unreached: 1 },
        steps: [{ keyboard: { reached: false, ended: true } }],
      },
      todo: true,
    },
    {
      id: 'several-steps',
      change: { shape: '여러 단계' },
      e2e: `${E2E}/several-steps.spec.ts`,
      expected: {
        summary: { tabs: 3, unnamed: 0, unreached: 0 },
        steps: [
          { action: 'fill', target: 'textbox "이름"', keyboard: { path: { tab: 1, arrow: 0 } } },
          {
            action: 'check',
            target: 'checkbox "약관에 동의합니다"',
            keyboard: { startFocus: 'textbox "이름"', path: { tab: 1, arrow: 0 } },
          },
          {
            action: 'click',
            target: 'button "가입하기"',
            keyboard: { startFocus: 'checkbox "약관에 동의합니다"', path: { tab: 1, arrow: 0 } },
          },
          { action: 'toHaveText', target: 'status' },
        ],
      },
      todo: true,
    },
    {
      id: 'waits-and-getters',
      change: { shape: '대기와 값 읽기가 섞임' },
      e2e: `${E2E}/waits-and-getters.spec.ts`,
      expected: {
        steps: [
          {
            action: 'click',
            target: 'button "주문하기"',
            location: `${FILE}/waits-and-getters.spec.ts:8`,
          },
          {
            action: 'toHaveText',
            target: 'status',
            location: `${FILE}/waits-and-getters.spec.ts:9`,
          },
        ],
      },
      todo: true,
    },
    {
      id: 'repeated-stop',
      change: { shape: '같은 지점을 여러 단계가 지남' },
      e2e: `${E2E}/repeated-stop.spec.ts`,
      expected: {
        summary: { tabs: 4, unnamed: 2, unreached: 0 },
        steps: [
          {
            keyboard: {
              path: { tab: 2, arrow: 0 },
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '',
                  nameSource: null,
                  states: {},
                  landmarks: ['main'],
                  heading: null,
                  isTarget: false,
                },
                { index: 2, role: 'button', name: '저장', isTarget: true },
              ],
            },
          },
          {},
          {
            target: 'button',
            keyboard: {
              startFocus: 'button "저장"',
              path: { tab: 2, arrow: 0 },
              stops: [
                {
                  index: 2,
                  role: 'button',
                  name: '',
                  nameSource: null,
                  states: {},
                  landmarks: ['main'],
                  heading: null,
                  isTarget: true,
                },
              ],
            },
          },
          { target: 'searchbox "검색어"' },
        ],
      },
      todo: true,
    },
  ],
  noCase: {
    shape: {
      '재실행된 테스트':
        '"키를 추측해 실행한다" 케이스들이 최종 회차의 status·retry와 버린 회차를 담은 attempts로 확인한다.',
    },
    output: {
      'JSON 파일 머리(schemaVersion, tool, environment)':
        '실행기가 아직 확인하지 못함: 실행기는 a11y-results.json에서 케이스의 테스트 기록만 꺼내 비교한다. 파일 머리의 schemaVersion·tool·environment를 기대값에 적고 비교하는 칸이 필요하다.',
      'JSON 버전 1에서 빼는 필드':
        '실행기가 아직 확인하지 못함: 조각 비교는 toMatchObject라 focusVisual·skipLinks·resultChannels가 없다는 것을 확인하지 못한다. 없어야 하는 필드를 적는 표기가 필요하다(E2E 케이스의 전체 비교는 간접으로 확인한다).',
      '리포트 단계 제목': `${NEEDS_REPORT} a11y 테스트의 단계 제목(예: a11y click: 5 Tab, 이름 없음 1 -> getByRole(...))을 읽어 비교해야 한다.`,
      '리포트 지점 자식 단계': `${NEEDS_REPORT} 각 a11y 단계 아래 자식 단계(Tab 지점 한 줄씩)를 읽어 비교해야 한다.`,
      '리포트 실행 키와 앞 회차 실패 키': `${NEEDS_REPORT} 단계 제목의 실행 키 부분(예: a11y dblclick → Space · 앞 회차 Enter는 다음 줄 실패)을 읽어 비교해야 한다.`,
      '요약 annotation': `${NEEDS_REPORT} 테스트 annotation(예: Tab 30 · 이름 없음 2 · 도달 실패 0)을 읽어 비교해야 한다.`,
      '다음 단계 없음 annotation': `${NEEDS_REPORT} 다음 단계가 없어 확인하지 못한 키를 적은 테스트 끝 annotation을 읽어 비교해야 한다.`,
      이미지: `${NEEDS_REPORT} 첨부 목록(이름 없음·도달 실패 지점의 상자 그린 이미지와 원본 이미지)의 이름·종류·개수를 읽어 비교해야 한다.`,
      '도달 못 함 실패 메시지': `${NEEDS_REPORT} 테스트 오류 메시지(예: a11y: Tab 21회 탐색 후 "약관 전문 보기"에 도달하지 못해 여기서 종료)를 읽어 비교해야 한다.`,
      '재실행 메시지': `${NEEDS_REPORT} 버린 회차의 오류 메시지(예: a11y: Enter 다음 단계 안 됨, 처음부터 다시 실행)를 회차별로 읽어 비교해야 한다.`,
      '재실행 전제 힌트': `${NEEDS_REPORT} 실패한 회차의 힌트(예: a11y 힌트: 이전 회차의 Enter 뒤 POST /api/delete가 있었고...)를 읽어야 하고, 회차 사이에 서버 상태가 남는 시험용 API도 필요하다.`,
      'trace의 Tab 지점 스냅샷':
        '실행기가 아직 확인하지 못함: 실행기는 trace를 첨부만 하고 열지 않는다. trace 안의 getter 호출(Tab 지점마다 locator(":focus") 스냅샷)을 읽어 개수와 순서를 비교해야 한다.',
    },
  },
});
