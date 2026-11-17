import type { JSONReportTestResult } from '@playwright/test/reporter';

import type { Expected } from './define-scenario';

/** Name of the text attachment the tool adds to every test of an accessibility run. */
export const SUMMARY_ATTACHMENT = '키보드 실행';
/** Start of the terminal lines the tool prints for lines it could not check. */
export const NOTICE_PREFIX = '[journey-a11y]';

const ANSI_COLOR = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g');

/**
 * Reads what the tool left in one test result of the Playwright JSON report.
 * @param result Last result of the accessibility run test.
 */
export function readActual(result: JSONReportTestResult): Expected {
  // A timed out test has two errors: the time limit, then the action that was still waiting.
  const messages = result.errors.map((item) => item.message);
  const error = messages.length > 0 ? messages.join('\n') : result.error?.message;
  return {
    status: result.status === 'passed' ? 'passed' : 'failed',
    ...(error === undefined ? {} : { error: error.replace(ANSI_COLOR, '') }),
    lines: toLines(readSummary(result)),
    notices: toLines(readStdout(result)).filter((line) => line.startsWith(NOTICE_PREFIX)),
  };
}

/**
 * Reads the text of the summary attachment. The JSON report keeps attachment bodies as base64.
 * @param result Test result of the Playwright JSON report.
 */
function readSummary(result: JSONReportTestResult): string {
  const attachment = result.attachments.find((item) => item.name === SUMMARY_ATTACHMENT);
  return attachment?.body === undefined
    ? ''
    : Buffer.from(attachment.body, 'base64').toString('utf8');
}

/**
 * Joins what the test printed to the terminal.
 * @param result Test result of the Playwright JSON report.
 */
function readStdout(result: JSONReportTestResult): string {
  return result.stdout
    .map((entry) =>
      'text' in entry ? entry.text : Buffer.from(entry.buffer, 'base64').toString('utf8'),
    )
    .join('');
}

/**
 * Splits text into its lines, without empty ones.
 * @param text Text with `\n` or `\r\n` line ends.
 */
function toLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line !== '');
}
