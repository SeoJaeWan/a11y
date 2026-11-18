import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { JSONReport, JSONReportSuite, JSONReportTest } from '@playwright/test/reporter';

import type { Expected } from './define-scenario';
import { groupDir } from './load-scenarios';
import { TEST_DIR } from './paths';
import { readActual } from './read-actual';

/** What an inner run left for one E2E file. */
export type InnerResult = {
  /** Plain run result of the file (project `chromium`). */
  plain: JSONReportTest | undefined;
  /** Accessibility run result of the file (project `a11y`). */
  a11y: JSONReportTest | undefined;
  /** What the tool left in the accessibility run test. */
  actual: Expected | undefined;
  /** Trace of the accessibility run. */
  tracePath: string | undefined;
};

/**
 * Reads the inner run report of a group and picks out one E2E file.
 * @param group Group the case ran in.
 * @param e2e E2E file relative to test/.
 */
export function readInnerResult(group: string, e2e: string): InnerResult {
  const reportPath = path.join(groupDir(group), 'report.json');
  if (!existsSync(reportPath)) {
    throw new Error(`The inner run left no report at ${reportPath}. Check the setup output.`);
  }
  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as JSONReport;
  const file = toPosix(path.relative(path.join(TEST_DIR, 'e2e'), path.join(TEST_DIR, e2e)));
  const tests = report.suites.flatMap((suite) => testsOfFile(suite, file));
  const a11y = tests.find((test) => test.projectName === 'a11y');
  const lastResult = a11y?.results.at(-1);
  return {
    plain: tests.find((test) => test.projectName === 'chromium'),
    a11y,
    actual: lastResult ? readActual(lastResult, a11y?.annotations) : undefined,
    tracePath: lastResult?.attachments.find((item) => item.name === 'trace')?.path,
  };
}

/**
 * Collects the tests of one file from a JSON report suite.
 * @param suite Suite of the Playwright JSON report.
 * @param file E2E file relative to test/e2e.
 */
function testsOfFile(suite: JSONReportSuite, file: string): JSONReportTest[] {
  const own = suite.file === file ? suite.specs.flatMap((spec) => spec.tests) : [];
  return [...own, ...(suite.suites ?? []).flatMap((child) => testsOfFile(child, file))];
}

/**
 * Uses `/` between path parts on every OS.
 * @param filePath Path that may use `\` on Windows.
 */
function toPosix(filePath: string): string {
  return filePath.split(path.sep).join('/').split('\\').join('/');
}
