import { describe, expect, it } from 'vitest';

import { findCaller, userFrames } from './caller';

const OWN_DIR = '/repo/node_modules/journey-a11y/dist';
const STACK = [
  'Error',
  '    at Frame.click (/repo/node_modules/journey-a11y/dist/index.mjs:10:5)',
  '    at Locator.click (/repo/node_modules/playwright-core/lib/client/locator.js:150:20)',
  '    at /repo/e2e/login.spec.ts:6:40',
  '    at node:internal/process/task_queues:105:5',
].join('\n');

// @codocs [[Journey A11y:결과]]
describe('사용자 테스트의 줄 찾기', () => {
  it('도구와 의존성, Node의 줄을 빼고 사용자 코드의 줄만 남긴다', () => {
    expect(userFrames(STACK, OWN_DIR)).toEqual(['    at /repo/e2e/login.spec.ts:6:40']);
  });

  it('동작을 부른 줄의 파일과 줄 번호를 읽는다', () => {
    expect(findCaller(STACK, OWN_DIR)).toEqual({
      file: '/repo/e2e/login.spec.ts',
      line: 6,
      column: 40,
    });
  });

  it('도구 폴더가 node_modules 밖이어도 도구의 줄은 뺀다', () => {
    const stack = [
      'Error',
      '    at reach (/repo/src/run/reach.ts:20:9)',
      '    at fn (/repo/test/e2e/a.spec.ts:5:3)',
    ].join('\n');
    expect(findCaller(stack, '/repo/src')?.line).toBe(5);
  });
});
