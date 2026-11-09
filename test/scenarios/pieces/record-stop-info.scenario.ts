import { definePieceScenario } from '../../runner/define-scenario';

const E2E = 'e2e/pieces/record-stop-info';

export const scenario = definePieceScenario({
  name: '지점의 정보를 기록한다',
  conditions: {
    role: {
      label: '역할',
      values: ['요소 기본 역할', 'role 속성', '닫힌 shadow DOM 안 요소'],
      base: '요소 기본 역할',
    },
    name: {
      label: '이름',
      values: ['이름 있음', '이름 없음'],
      base: '이름 있음',
    },
    nameSource: {
      label: '이름 출처',
      values: ['contents', 'aria-label', 'aria-labelledby', 'label', 'placeholder', 'title', 'alt'],
      base: 'contents',
    },
    states: {
      label: '상태',
      values: [
        '상태 없음',
        'checked',
        'mixed',
        'disabled',
        'expanded',
        'invalid',
        'pressed',
        'readonly',
        'required',
        'selected',
      ],
      base: '상태 없음',
    },
    landmarks: {
      label: '랜드마크',
      values: ['main', '랜드마크 없음', '여러 겹', '이름 있는 region', '이름 없는 section·form'],
      base: 'main',
    },
    heading: {
      label: '제목',
      values: ['앞의 h1', '제목 없음', '앞의 제목 여럿', '뒤에만 있음', 'role="heading"'],
      base: '앞의 h1',
    },
    frame: {
      label: '프레임',
      values: ['페이지', 'iframe 안'],
      base: '페이지',
    },
  },
  cases: [
    {
      id: 'base',
      change: {},
      e2e: `${E2E}/base.spec.ts`,
      expected: {
        steps: [
          {
            target: 'button "저장"',
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'role-attribute',
      change: { role: 'role 속성' },
      e2e: `${E2E}/role-attribute.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'closed-shadow',
      change: { role: '닫힌 shadow DOM 안 요소' },
      e2e: `${E2E}/closed-shadow.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '알림 끄기',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: false,
                },
                {
                  index: 2,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'unnamed',
      change: { name: '이름 없음' },
      e2e: `${E2E}/unnamed.spec.ts`,
      expected: {
        steps: [
          {
            target: 'button',
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '',
                  nameSource: null,
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'aria-label',
      change: { nameSource: 'aria-label' },
      e2e: `${E2E}/aria-label.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '닫기',
                  nameSource: 'aria-label',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'aria-labelledby',
      change: { nameSource: 'aria-labelledby' },
      e2e: `${E2E}/aria-labelledby.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'textbox',
                  name: '하루 최대 알림 수',
                  nameSource: 'aria-labelledby',
                  states: { readonly: false, required: false },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'label',
      change: { nameSource: 'label' },
      e2e: `${E2E}/label.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'textbox',
                  name: '알림 받을 이메일',
                  nameSource: 'label',
                  states: { readonly: false, required: false },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'placeholder',
      change: { nameSource: 'placeholder' },
      e2e: `${E2E}/placeholder.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'textbox',
                  name: '알림 받을 키워드',
                  nameSource: 'placeholder',
                  states: { readonly: false, required: false },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'title',
      change: { nameSource: 'title' },
      e2e: `${E2E}/title.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '새로 고침',
                  nameSource: 'title',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'alt',
      change: { nameSource: 'alt' },
      e2e: `${E2E}/alt.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '알림 테스트 보내기',
                  nameSource: 'alt',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'checked',
      change: { states: 'checked' },
      e2e: `${E2E}/checked.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'checkbox',
                  name: '뉴스레터 받기',
                  nameSource: 'label',
                  states: { checked: true },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'mixed',
      change: { states: 'mixed' },
      e2e: `${E2E}/mixed.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'checkbox',
                  name: '전체 선택',
                  nameSource: 'label',
                  states: { checked: 'mixed' },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'disabled',
      change: { states: 'disabled' },
      e2e: `${E2E}/disabled.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '지금 보내기',
                  nameSource: 'contents',
                  states: { disabled: true },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: false,
                },
                {
                  index: 2,
                  role: 'button',
                  name: '테스트 보내기',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'expanded',
      change: { states: 'expanded' },
      e2e: `${E2E}/expanded.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '고급 설정',
                  nameSource: 'contents',
                  states: { expanded: false },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'invalid',
      change: { states: 'invalid' },
      e2e: `${E2E}/invalid.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'textbox',
                  name: '휴대폰 번호',
                  nameSource: 'label',
                  states: { invalid: true, readonly: false, required: false },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'pressed',
      change: { states: 'pressed' },
      e2e: `${E2E}/pressed.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '알림 끄기',
                  nameSource: 'contents',
                  states: { pressed: false },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'readonly',
      change: { states: 'readonly' },
      e2e: `${E2E}/readonly.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'textbox',
                  name: '기기 ID',
                  nameSource: 'label',
                  states: { readonly: true, required: false },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: false,
                },
                {
                  index: 2,
                  role: 'button',
                  name: '복사',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'required',
      change: { states: 'required' },
      e2e: `${E2E}/required.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'textbox',
                  name: '알림에 쓸 이름',
                  nameSource: 'label',
                  states: { readonly: false, required: true },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'selected',
      change: { states: 'selected' },
      e2e: `${E2E}/selected.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'tab',
                  name: '앱',
                  nameSource: 'contents',
                  states: { selected: true },
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: false,
                },
                {
                  index: 2,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'no-landmark',
      change: { landmarks: '랜드마크 없음' },
      e2e: `${E2E}/no-landmark.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: [],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'nested-landmarks',
      change: { landmarks: '여러 겹' },
      e2e: `${E2E}/nested-landmarks.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '전체 메뉴',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['banner', 'navigation "주 메뉴"'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'named-region',
      change: { landmarks: '이름 있는 region' },
      e2e: `${E2E}/named-region.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '켜기',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main', 'region "방해 금지"'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'unnamed-region',
      change: { landmarks: '이름 없는 section·form' },
      e2e: `${E2E}/unnamed-region.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h1 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'no-heading',
      change: { heading: '제목 없음' },
      e2e: `${E2E}/no-heading.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: null,
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'nearest-heading',
      change: { heading: '앞의 제목 여럿' },
      e2e: `${E2E}/nearest-heading.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '켜기',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h2 문자 알림',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'heading-after',
      change: { heading: '뒤에만 있음' },
      e2e: `${E2E}/heading-after.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: null,
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'role-heading',
      change: { heading: 'role="heading"' },
      e2e: `${E2E}/role-heading.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '저장',
                  nameSource: 'contents',
                  states: {},
                  landmarks: ['main'],
                  heading: 'h3 알림 설정',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'in-iframe',
      change: { frame: 'iframe 안' },
      e2e: `${E2E}/in-iframe.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              stops: [
                {
                  index: 1,
                  role: 'button',
                  name: '미리보기 보내기',
                  nameSource: 'contents',
                  frame: 'iframe "알림 미리보기"',
                  isTarget: true,
                },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
  ],
  noCase: {},
});
