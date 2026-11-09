import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { JSONReport, JSONReportSuite, JSONReportTest } from '@playwright/test/reporter';

import type { JsonObject } from './json';
import { groupDir } from './load-scenarios';
import { TEST_DIR } from './paths';

/** What an inner run left for one E2E file. */
export type InnerResult = {
  /** Plain run result of the file (project `chromium`). */
  plain: JSONReportTest | undefined;
  /** Accessibility run result of the file (project `a11y`). */
  a11y: JSONReportTest | undefined;
  /** The file's test in `a11y-results.json`. */
  record: JsonObject | undefined;
  /** Trace of the accessibility run. */
  tracePath: string | undefined;
};

/**
 * Reads the inner run files of a group and picks out one E2E file.
 * @param group Group the case ran in.
 * @param e2e E2E file relative to test/.
 */
export function readInnerResult(group: string, e2e: string): InnerResult {
  const dir = groupDir(group);
  const reportPath = path.join(dir, 'report.json');
  if (!existsSync(reportPath)) {
    throw new Error(`The inner run left no report at ${reportPath}. Check the setup output.`);
  }
  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as JSONReport;
  const file = toPosix(path.relative(path.join(TEST_DIR, 'e2e'), path.join(TEST_DIR, e2e)));
  const tests = report.suites.flatMap((suite) => testsOfFile(suite, file));
  const a11y = tests.find((test) => test.projectName === 'a11y');
  return {
    plain: tests.find((test) => test.projectName === 'chromium'),
    a11y,
    record: readRecord(path.join(dir, 'test-results', 'a11y-results.json'), file),
    tracePath: a11y?.results.at(-1)?.attachments.find((item) => item.name === 'trace')?.path,
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
 * Finds the test record of one file in `a11y-results.json`.
 * @param recordPath Path of `a11y-results.json`.
 * @param file E2E file relative to test/e2e.
 */
function readRecord(recordPath: string, file: string): JsonObject | undefined {
  if (!existsSync(recordPath)) return undefined;
  const results = JSON.parse(readFileSync(recordPath, 'utf8')) as { tests?: JsonObject[] };
  return results.tests?.find(
    (test) => typeof test.file === 'string' && toPosix(test.file).endsWith(file),
  );
}

/**
 * Uses `/` between path parts on every OS.
 * @param filePath Path that may use `\` on Windows.
 */
function toPosix(filePath: string): string {
  return filePath.split(path.sep).join('/').split('\\').join('/');
}
