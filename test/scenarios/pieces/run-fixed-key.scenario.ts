import { definePieceScenario } from '../../runner/define-scenario';
import type { JsonObject } from '../../runner/json';

const E2E = 'e2e/pieces/run-fixed-key';

/**
 * One key attempt that is the only one: the key is fixed, so there is no rerun.
 * @param key Playwright key name.
 * @param nextStep Whether the next E2E step went on.
 */
function onlyKey(key: string, nextStep = 'continued'): JsonObject[] {
  return [{ key, source: 'role', nextStep, requests: [] }];
}

export const scenario = definePieceScenario({
  name: '키가 정해진 동작을 실행한다',
  conditions: {
    action: {
      label: '동작과 대상',
      values: [
        'click: 버튼',
        'click: 링크',
        'check: 체크박스',
        'press: E2E가 정한 키',
        'selectOption: 하나',
        'selectOption: 여러 개(multiple)',
        'selectOption: 사이에 비활성 옵션',
        '라디오: 방향키로 도착',
        '라디오: Tab으로 들어간 곳이 목표',
        'fill: 입력창',
        'fill: 값이 있는 입력창',
        'fill: textarea',
        'fill: 숫자',
        'fill: contenteditable',
        'fill: 편집기(Quill·TipTap)',
        'fill: date',
        'fill: time',
        'fill: datetime-local',
        'fill: month',
        'fill: week',
        'fill: 페이지 언어와 브라우저 언어가 다른 날짜',
        'fill: range',
        'fill: 색 선택',
        'click: 자동완성 옵션',
        'setInputFiles: 보이는 입력',
        'setInputFiles: 화면에서만 숨긴 입력',
        'setInputFiles: 입력을 감싼 영역(dropzone)',
        'page.mouse.click: 좌표 아래 버튼',
        'page.mouse.wheel',
      ],
      base: 'click: 버튼',
    },
    nextStep: {
      label: '다음 단계',
      values: ['앞 동작의 결과 확인', '다음 단계 없음', '정해진 키로 이어지지 않음'],
      base: '앞 동작의 결과 확인',
    },
  },
  cases: [
    {
      id: 'button-click',
      change: {},
      e2e: `${E2E}/button-click.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ keyboard: { reached: true, attempts: onlyKey('Enter') } }, {}],
      },
      todo: true,
    },
    {
      id: 'link',
      change: { action: 'click: 링크' },
      e2e: `${E2E}/link.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ keyboard: { reached: true, attempts: onlyKey('Enter') } }, {}],
      },
      todo: true,
    },
    {
      id: 'check',
      change: { action: 'check: 체크박스' },
      e2e: `${E2E}/check.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ keyboard: { reached: true, attempts: onlyKey('Space') } }, {}],
      },
      todo: true,
    },
    {
      id: 'press',
      change: { action: 'press: E2E가 정한 키' },
      e2e: `${E2E}/press.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          {},
          { action: 'press', keyboard: { reached: true, path: { tab: 0, arrow: 0 } } },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'select-one',
      change: { action: 'selectOption: 하나' },
      e2e: `${E2E}/select-one.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ keyboard: { reached: true, attempts: onlyKey('Enter') } }, {}],
      },
      todo: true,
    },
    {
      id: 'select-multiple',
      change: { action: 'selectOption: 여러 개(multiple)' },
      e2e: `${E2E}/select-multiple.spec.ts`,
      expected: { status: 'passed', retry: 0, steps: [{ keyboard: { reached: true } }, {}] },
      todo: true,
    },
    {
      id: 'select-disabled-option',
      change: { action: 'selectOption: 사이에 비활성 옵션' },
      e2e: `${E2E}/select-disabled-option.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ keyboard: { reached: true, attempts: onlyKey('Enter') } }, {}],
      },
      todo: true,
    },
    {
      id: 'radio-arrow',
      change: { action: '라디오: 방향키로 도착' },
      e2e: `${E2E}/radio-arrow.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 2, role: 'radio', name: '빠른 배송', states: { checked: true } },
                { index: 3, role: 'radio', name: '당일 배송', isTarget: true },
              ],
              attempts: [],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'radio-tab-target',
      change: { action: '라디오: Tab으로 들어간 곳이 목표' },
      e2e: `${E2E}/radio-tab-target.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 0 },
              stops: [{ index: 1, role: 'radio', name: '카드', states: { checked: false } }],
              attempts: onlyKey('Space'),
            },
          },
          {},
        ],
      },
      todo: true,
    },
    ...[
      ['fill-text', 'fill: 입력창'],
      ['fill-replace', 'fill: 값이 있는 입력창'],
      ['fill-textarea', 'fill: textarea'],
      ['fill-number', 'fill: 숫자'],
      ['fill-contenteditable', 'fill: contenteditable'],
      ['fill-date', 'fill: date'],
      ['fill-time', 'fill: time'],
      ['fill-datetime-local', 'fill: datetime-local'],
      ['fill-month', 'fill: month'],
      ['fill-week', 'fill: week'],
      ['fill-date-page-language', 'fill: 페이지 언어와 브라우저 언어가 다른 날짜'],
      ['fill-range', 'fill: range'],
    ].map(([id = '', value = '']) => ({
      id,
      change: { action: value },
      e2e: `${E2E}/${id}.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ action: 'fill', keyboard: { reached: true, attempts: [] } }, {}],
      },
      todo: true,
    })),
    {
      id: 'fill-color',
      change: { action: 'fill: 색 선택' },
      e2e: `${E2E}/fill-color.spec.ts`,
      expected: { status: 'passed', retry: 0, steps: [{ keyboard: { reached: true } }, {}] },
      todo: true,
    },
    {
      id: 'autocomplete-option',
      change: { action: 'click: 자동완성 옵션' },
      e2e: `${E2E}/autocomplete-option.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          { keyboard: { reached: true, attempts: [] } },
          {
            keyboard: {
              reached: true,
              startFocus: 'combobox "도착 도시"',
              path: { tab: 0, arrow: 2 },
              attempts: onlyKey('Enter'),
            },
          },
          {},
        ],
      },
      todo: true,
    },
    ...[
      ['file-visible-input', 'setInputFiles: 보이는 입력'],
      ['file-visually-hidden-input', 'setInputFiles: 화면에서만 숨긴 입력'],
      ['file-dropzone', 'setInputFiles: 입력을 감싼 영역(dropzone)'],
    ].map(([id = '', value = '']) => ({
      id,
      change: { action: value },
      e2e: `${E2E}/${id}.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [{ action: 'setInputFiles', keyboard: { reached: true } }, {}],
      },
      todo: true,
    })),
    {
      id: 'mouse-click-button',
      change: { action: 'page.mouse.click: 좌표 아래 버튼' },
      e2e: `${E2E}/mouse-click-button.spec.ts`,
      expected: {
        status: 'passed',
        retry: 0,
        steps: [
          {
            action: 'mouse.click',
            target: '좌표 (20, 20) → button "저장" (좌표로 추정)',
            keyboard: { reached: true, attempts: onlyKey('Enter') },
          },
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
        steps: [{ keyboard: { reached: true, attempts: onlyKey('Enter', 'no-next-step') } }],
      },
      todo: true,
    },
    {
      id: 'not-continued',
      change: { nextStep: '정해진 키로 이어지지 않음' },
      e2e: `${E2E}/not-continued.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: true,
              attempts: onlyKey('Enter', 'not-continued'),
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
  ],
  noCase: {
    action: {
      'fill: 편집기(Quill·TipTap)':
        '시험용 앱에 편집기 라이브러리가 없다. 입력 방법(Ctrl+A 뒤 글자마다 키)은 contenteditable 케이스와 같다.',
      'page.mouse.wheel':
        '목표가 없는 스크롤이라 원래대로 실행하고 기록만 남기는데, 그 단계의 기록 모양(keyboard 칸 유무)을 문서가 정하지 않았다.',
    },
  },
});
