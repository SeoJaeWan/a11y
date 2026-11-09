import { definePieceScenario } from '../../runner/define-scenario';

const E2E = 'e2e/pieces/walk-to-target';

export const scenario = definePieceScenario({
  name: '목표까지 찾아간다',
  conditions: {
    targetKind: {
      label: '목표 요소 종류',
      values: [
        '버튼',
        '링크',
        '입력창',
        'tablist 안 탭',
        'menubar 안 항목',
        'toolbar 안 버튼',
        '세로 toolbar 안 버튼',
        'menu 안 항목',
        'listbox 안 옵션',
        'tree 안 항목',
        'radiogroup 안 라디오',
        'grid 안 칸',
        'aria-activedescendant 목록 옵션',
        '자동완성 옵션',
        '역할 없는 제안 목록',
        '역할 없는 위젯',
        '같은 출처 iframe 안 버튼',
        '다른 출처 iframe 안 버튼',
        '열린 shadow DOM 안 버튼',
        '닫힌 shadow DOM 안 버튼',
        '가상 스크롤 목록 항목',
      ],
      base: '버튼',
    },
    locator: {
      label: '목표 지목 방법',
      values: [
        'getByRole',
        '체이닝',
        'nth',
        'filter',
        'page.click(selector)',
        'page.mouse.click 좌표',
        'ElementHandle.click',
      ],
      base: 'getByRole',
    },
    startFocus: {
      label: '시작 포커스',
      values: [
        'body (페이지 진입 직후)',
        '앞 단계 목표',
        '목표보다 뒤',
        '목표 자체',
        '사라진 요소 자리',
        '페이지 이동 후 body',
        '앱이 옮긴 포커스',
      ],
      base: 'body (페이지 진입 직후)',
    },
  },
  cases: [
    {
      id: 'button',
      change: {},
      e2e: `${E2E}/button.spec.ts`,
      expected: {
        steps: [
          {
            target: 'button "저장"',
            keyboard: {
              reached: true,
              startFocus: 'body',
              path: { tab: 3, arrow: 0 },
              stops: [
                { index: 1, role: 'link', name: '도움말', isTarget: false },
                { index: 2, role: 'button', name: '취소', isTarget: false },
                { index: 3, role: 'button', name: '저장', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'link',
      change: { targetKind: '링크' },
      e2e: `${E2E}/link.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 2, arrow: 0 },
              stops: [{ index: 2, role: 'link', name: '환불 규정', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'text-input',
      change: { targetKind: '입력창' },
      e2e: `${E2E}/text-input.spec.ts`,
      expected: {
        steps: [
          {
            action: 'fill',
            keyboard: {
              reached: true,
              path: { tab: 2, arrow: 0 },
              stops: [
                { index: 1, role: 'textbox', name: '이름', isTarget: false },
                { index: 2, role: 'textbox', name: '이메일', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'tablist',
      change: { targetKind: 'tablist 안 탭' },
      e2e: `${E2E}/tablist.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'tab', name: '소개', isTarget: false },
                { index: 2, role: 'tab', name: '리뷰', isTarget: false },
                { index: 3, role: 'tab', name: '문의', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'menubar',
      change: { targetKind: 'menubar 안 항목' },
      e2e: `${E2E}/menubar.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'menuitem', name: '저장', isTarget: false },
                { index: 2, role: 'menuitem', name: '내보내기', isTarget: false },
                { index: 3, role: 'menuitem', name: '인쇄', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'toolbar',
      change: { targetKind: 'toolbar 안 버튼' },
      e2e: `${E2E}/toolbar.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'button', name: '굵게', isTarget: false },
                { index: 2, role: 'button', name: '기울임', isTarget: false },
                { index: 3, role: 'button', name: '밑줄', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'vertical-toolbar',
      change: { targetKind: '세로 toolbar 안 버튼' },
      e2e: `${E2E}/vertical-toolbar.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'button', name: '펜', isTarget: false },
                { index: 2, role: 'button', name: '지우개', isTarget: false },
                { index: 3, role: 'button', name: '도형', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'menu',
      change: { targetKind: 'menu 안 항목' },
      e2e: `${E2E}/menu.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'menuitem', name: '복사', isTarget: false },
                { index: 2, role: 'menuitem', name: '이동', isTarget: false },
                { index: 3, role: 'menuitem', name: '삭제', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'listbox',
      change: { targetKind: 'listbox 안 옵션' },
      e2e: `${E2E}/listbox.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'option', name: '일반석', isTarget: false },
                { index: 2, role: 'option', name: '프리미엄', isTarget: false },
                { index: 3, role: 'option', name: '비즈니스', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'tree',
      change: { targetKind: 'tree 안 항목' },
      e2e: `${E2E}/tree.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'treeitem', name: '문서', isTarget: false },
                { index: 2, role: 'treeitem', name: '사진', isTarget: false },
                { index: 3, role: 'treeitem', name: '음악', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'radiogroup',
      change: { targetKind: 'radiogroup 안 라디오' },
      e2e: `${E2E}/radiogroup.spec.ts`,
      expected: {
        steps: [
          {
            action: 'check',
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'radio', name: '일반 배송', isTarget: false },
                { index: 2, role: 'radio', name: '빠른 배송', isTarget: false },
                { index: 3, role: 'radio', name: '새벽 배송', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'grid',
      change: { targetKind: 'grid 안 칸' },
      e2e: `${E2E}/grid.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [
                { index: 1, role: 'gridcell', name: 'A1', isTarget: false },
                { index: 3, role: 'gridcell', name: 'B2', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'active-descendant',
      change: { targetKind: 'aria-activedescendant 목록 옵션' },
      e2e: `${E2E}/active-descendant.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 2 },
              stops: [{ index: 3, role: 'option', name: '높은 가격순', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'autocomplete-option',
      change: { targetKind: '자동완성 옵션' },
      e2e: `${E2E}/autocomplete-option.spec.ts`,
      expected: {
        steps: [
          {},
          {
            keyboard: {
              reached: true,
              startFocus: 'combobox "도시"',
              path: { tab: 0, arrow: 3 },
              stops: [
                { index: 1, role: 'option', name: '서울', isTarget: false },
                { index: 2, role: 'option', name: '서산', isTarget: false },
                { index: 3, role: 'option', name: '서귀포', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'roleless-suggestions',
      change: { targetKind: '역할 없는 제안 목록' },
      e2e: `${E2E}/roleless-suggestions.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {},
          {
            keyboard: {
              reached: false,
              startFocus: 'textbox "도시"',
              path: { tab: 4, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '검색', isTarget: false },
                { index: 3, role: 'textbox', name: '도시', isTarget: false },
              ],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'roleless-tabs',
      change: { targetKind: '역할 없는 위젯' },
      e2e: `${E2E}/roleless-tabs.spec.ts`,
      expected: {
        status: 'failed',
        steps: [
          {
            keyboard: {
              reached: false,
              path: { tab: 3, arrow: 0 },
              stops: [{ index: 1, role: 'generic', name: '소개', isTarget: false }],
              ended: true,
            },
          },
        ],
      },
      todo: true,
    },
    {
      id: 'same-origin-iframe',
      change: { targetKind: '같은 출처 iframe 안 버튼' },
      e2e: `${E2E}/same-origin-iframe.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 2, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '쿠폰 적용', isTarget: false },
                {
                  index: 2,
                  role: 'button',
                  name: '결제하기',
                  frame: 'iframe "결제 위젯"',
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
      id: 'open-shadow',
      change: { targetKind: '열린 shadow DOM 안 버튼' },
      e2e: `${E2E}/open-shadow.spec.ts`,
      expected: {
        steps: [
          {
            keyboard: {
              reached: true,
              path: { tab: 2, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '이벤트 안내', isTarget: false },
                { index: 2, role: 'button', name: '쿠폰 받기', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'chained-locator',
      change: { locator: '체이닝' },
      e2e: `${E2E}/chained-locator.spec.ts`,
      expected: {
        steps: [
          {
            target: 'button "담기"',
            keyboard: {
              reached: true,
              path: { tab: 2, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '담기', isTarget: false },
                { index: 2, role: 'button', name: '담기', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'nth-locator',
      change: { locator: 'nth' },
      e2e: `${E2E}/nth-locator.spec.ts`,
      expected: {
        steps: [
          {
            target: 'button "담기"',
            keyboard: {
              reached: true,
              path: { tab: 3, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '담기', isTarget: false },
                { index: 2, role: 'button', name: '담기', isTarget: false },
                { index: 3, role: 'button', name: '담기', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'filter-locator',
      change: { locator: 'filter' },
      e2e: `${E2E}/filter-locator.spec.ts`,
      expected: {
        steps: [
          {
            target: 'button "담기"',
            keyboard: {
              reached: true,
              path: { tab: 2, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '담기', isTarget: false },
                { index: 2, role: 'button', name: '담기', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'page-click-selector',
      change: { locator: 'page.click(selector)' },
      e2e: `${E2E}/page-click-selector.spec.ts`,
      expected: {
        steps: [
          {
            target: 'button "담기"',
            keyboard: {
              reached: true,
              path: { tab: 1, arrow: 0 },
              stops: [{ index: 1, role: 'button', name: '담기', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'mouse-coordinates',
      change: { locator: 'page.mouse.click 좌표' },
      e2e: `${E2E}/mouse-coordinates.spec.ts`,
      expected: {
        steps: [
          {
            action: 'mouse.click',
            target: '좌표 (20, 20) → button "저장" (좌표로 추정)',
            keyboard: {
              reached: true,
              path: { tab: 2, arrow: 0 },
              stops: [
                { index: 1, role: 'button', name: '취소', isTarget: false },
                { index: 2, role: 'button', name: '저장', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'after-previous-step',
      change: { startFocus: '앞 단계 목표' },
      e2e: `${E2E}/after-previous-step.spec.ts`,
      expected: {
        steps: [
          {},
          {
            keyboard: {
              reached: true,
              startFocus: 'textbox "받는 분"',
              path: { tab: 1, arrow: 0 },
              stops: [{ index: 1, role: 'button', name: '저장', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'after-target',
      change: { startFocus: '목표보다 뒤' },
      e2e: `${E2E}/after-target.spec.ts`,
      expected: {
        steps: [
          {},
          {
            keyboard: {
              reached: true,
              startFocus: 'button "미리보기"',
              path: { tab: 2, arrow: 0 },
              stops: [{ index: 2, role: 'button', name: '저장', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'on-target',
      change: { startFocus: '목표 자체' },
      e2e: `${E2E}/on-target.spec.ts`,
      expected: {
        steps: [
          {},
          {
            action: 'press',
            keyboard: {
              reached: true,
              startFocus: 'searchbox "검색어"',
              path: { tab: 0, arrow: 0 },
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'focus-lost',
      change: { startFocus: '사라진 요소 자리' },
      e2e: `${E2E}/focus-lost.spec.ts`,
      expected: {
        steps: [
          {},
          {
            keyboard: {
              reached: true,
              startFocus: 'body',
              focusLost: true,
              path: { tab: 1, arrow: 0 },
              stops: [{ index: 1, role: 'button', name: '가입하기', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'after-page-load',
      change: { startFocus: '페이지 이동 후 body' },
      e2e: `${E2E}/after-page-load.spec.ts`,
      expected: {
        steps: [
          {},
          {
            keyboard: {
              reached: true,
              startFocus: 'body',
              navigation: 'load',
              path: { tab: 2, arrow: 0 },
              stops: [
                { index: 1, role: 'link', name: '이전 글', isTarget: false },
                { index: 2, role: 'button', name: '좋아요', isTarget: true },
              ],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'moved-by-app',
      change: { startFocus: '앱이 옮긴 포커스' },
      e2e: `${E2E}/moved-by-app.spec.ts`,
      expected: {
        steps: [
          {},
          {
            action: 'fill',
            keyboard: {
              reached: true,
              startFocus: 'dialog "주소 변경"',
              path: { tab: 1, arrow: 0 },
              stops: [{ index: 1, role: 'textbox', name: '새 주소', isTarget: true }],
            },
          },
          {},
          {},
        ],
      },
      todo: true,
    },
  ],
  noCase: {
    targetKind: {
      '다른 출처 iframe 안 버튼':
        '시험용 앱이 아직 두 번째 출처를 띄우지 않음: 문서대로 같은 앱을 다른 포트로 하나 더 띄워야 하며, 공용 설정(vite·playwright webServer)을 바꿔야 한다. 프레임 안팎을 지나는 경로는 같은 출처 iframe 케이스가 확인한다',
      '닫힌 shadow DOM 안 버튼':
        '목표가 될 수 없음: 닫힌 shadow DOM 안 요소는 Playwright로 지목할 수 없어 지나가는 지점으로만 나온다(키보드 모드:탐색 경로). 그 지점의 기록은 "지점의 정보를 기록한다"의 닫힌 shadow DOM 케이스가 확인한다',
      '가상 스크롤 목록 항목':
        '기대 기록을 정할 수 없음: 문서는 가상 스크롤 목록을 규칙 밖으로 두고 "시도 범위를 기록한다"고만 하며, 목표가 아직 DOM에 없을 때 어떤 값을 남기는지 정하지 않았다',
    },
    locator: {
      'ElementHandle.click':
        '기대 기록을 정할 수 없음: 문서는 ElementHandle.click이 가로채기에서 별도 경로로 잡히지 않는다고만 적고, 도구가 그때 무엇을 할지(원래대로 실행, 기록 없음 등) 정하지 않았다',
    },
  },
});
