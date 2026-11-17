import type { JSONReportTestResult } from '@playwright/test/reporter';
import { describe, expect, it } from 'vitest';

import { readActual } from './read-actual';

/**
 * Builds a test result of the Playwright JSON report with only the fields a test sets.
 * @param fields Fields that differ from an empty passed result.
 */
function resultWith(fields: Partial<JSONReportTestResult>): JSONReportTestResult {
  return {
    workerIndex: 0,
    parallelIndex: 0,
    status: 'passed',
    duration: 0,
    error: undefined,
    errors: [],
    stdout: [],
    stderr: [],
    retry: 0,
    startTime: '',
    attachments: [],
    annotations: [],
    ...fields,
  };
}

// @codocs [[테스트 작성 규칙:기대값]]
describe('결과 읽기', () => {
  it('"키보드 실행" 첨부를 줄로 나눈다', () => {
    const body = Buffer.from('5행 click 통과: Tab 4번\r\n6행 click 통과: Tab 1번\n').toString(
      'base64',
    );
    const actual = readActual(
      resultWith({
        attachments: [
          { name: 'trace', contentType: 'application/zip', path: 'trace.zip' },
          { name: '키보드 실행', contentType: 'text/plain', body },
        ],
      }),
    );
    expect(actual).toEqual({
      status: 'passed',
      lines: ['5행 click 통과: Tab 4번', '6행 click 통과: Tab 1번'],
      notices: [],
    });
  });

  it('터미널 출력에서 도구의 알림 줄만 고른다', () => {
    const actual = readActual(
      resultWith({
        stdout: [
          { text: '테스트가 찍은 줄\n' },
          { text: '[journey-a11y] drag-to.spec.ts:5 dragTo — 키보드로 검사하지 못했습니다\n' },
        ],
      }),
    );
    expect(actual.notices).toEqual([
      '[journey-a11y] drag-to.spec.ts:5 dragTo — 키보드로 검사하지 못했습니다',
    ]);
  });

  it('통과가 아닌 상태는 실패로 읽고 오류 메시지의 색 코드를 뺀다', () => {
    const escape = String.fromCharCode(27);
    const actual = readActual(
      resultWith({
        status: 'timedOut',
        errors: [{ message: `${escape}[31m키보드로 닿을 수 없습니다${escape}[39m` }],
      }),
    );
    expect(actual.status).toBe('failed');
    expect(actual.error).toBe('키보드로 닿을 수 없습니다');
  });
});
