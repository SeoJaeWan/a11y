import { definePieceScenario } from '../../runner/define-scenario';

const E2E = 'e2e/pieces/toggle-a11y-run';

export const scenario = definePieceScenario({
  name: '접근성 실행을 켜고 끈다',
  conditions: {
    a11yEnv: {
      label: '`A11Y` 환경 변수',
      values: ['있음', '없음'],
      base: '있음',
    },
    project: {
      label: '실행할 project',
      values: ['지정 안 함', '`--project=a11y`'],
      base: '지정 안 함',
    },
    existingProject: {
      label: '기존 프로젝트 영향',
      values: ['함께 실행', '패키지 없는 실행과 비교'],
      base: '함께 실행',
    },
    version: {
      label: 'Playwright 버전',
      values: ['지원 범위 안', '지원 범위 밖'],
      base: '지원 범위 안',
    },
    testIdAttribute: {
      label: '`testIdAttribute` 설정',
      values: ['설정 없음', '최상위 `use`', '`chromium` project에만'],
      base: '설정 없음',
    },
    workers: {
      label: '`workers`',
      values: ['기본', '1'],
      base: '기본',
    },
  },
  cases: [
    {
      id: 'base',
      change: {},
      e2e: `${E2E}/base.spec.ts`,
      expected: {
        file: 'pieces/toggle-a11y-run/base.spec.ts',
        title: ['메모를 저장한다'],
        status: 'passed',
        retry: 0,
        steps: [
          { action: 'click', target: 'button "저장"', keyboard: { reached: true } },
          { action: 'toHaveText' },
        ],
      },
      todo: true,
    },
    {
      id: 'testid-top-level',
      change: { testIdAttribute: '최상위 `use`' },
      e2e: `${E2E}/testid-top-level.spec.ts`,
      config: 'playwright-data-qa.config.ts',
      expected: {
        status: 'passed',
        steps: [
          {
            target: 'button "저장"',
            keyboard: {
              reached: true,
              stops: [{ index: 2, role: 'button', name: '저장', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'testid-chromium-only',
      change: { testIdAttribute: '`chromium` project에만' },
      e2e: `${E2E}/testid-chromium-only.spec.ts`,
      config: 'playwright-testid-chromium.config.ts',
      expected: {
        status: 'passed',
        steps: [
          {
            target: 'button "저장"',
            keyboard: {
              reached: true,
              stops: [{ index: 2, role: 'button', name: '저장', isTarget: true }],
            },
          },
          {},
        ],
      },
      todo: true,
    },
    {
      id: 'workers-one',
      change: { workers: '1' },
      e2e: `${E2E}/workers-one.spec.ts`,
      config: 'playwright-workers-one.config.ts',
      expected: {
        file: 'pieces/toggle-a11y-run/workers-one.spec.ts',
        status: 'passed',
        steps: [{ target: 'button "저장"', keyboard: { reached: true } }, {}],
      },
      todo: true,
    },
  ],
  noCase: {
    a11yEnv: {
      없음: '실행기가 아직 확인하지 못함: `A11Y`가 없으면 a11y project가 없어 `a11y-results.json`에 기록이 없어야 하는데, 실행기는 기록이 있어야만 비교한다. 기록과 a11y 결과가 없고 일반 결과만 있음을 확인하는 비교가 필요하다',
    },
    project: {
      '`--project=a11y`':
        '실행기가 아직 확인하지 못함: 안쪽 실행에 `--project` 같은 명령줄 인자를 넘길 수 없고, a11y만 돌면 일반 결과가 없어 "일반 실행" 검사도 실패한다. 케이스별 명령줄 인자와 일반 결과가 없어야 함을 확인하는 비교가 필요하다',
    },
    existingProject: {
      '패키지 없는 실행과 비교':
        '실행기가 아직 확인하지 못함: 같은 E2E를 `a11yProjects()` 없는 설정으로도 돌려 일반 project의 리포터 단계, HTML 단계, trace 액션 목록을 정규화해 비교해야 하는데, 실행기는 a11y 기록만 비교한다',
    },
    version: {
      '지원 범위 밖':
        '실행기가 아직 확인하지 못함: 범위 밖 Playwright(예: 1.53)는 CI만 설치할 수 있고, 그때는 기록 없이 테스트가 통과하고 경고가 남아야 하는데 실행기는 기록이 있어야만 비교한다. 버전별 설치와 기록 없음·경고 확인이 필요하다',
    },
  },
});
