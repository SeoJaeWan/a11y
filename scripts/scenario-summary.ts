// Writes failed scenario cases to the GitHub Actions job summary.
// Runs with Node's type stripping, so it uses only Node built-ins and type-only imports.
import { appendFileSync, existsSync, readFileSync } from 'node:fs';

import type { JSONReport, JSONReportSuite } from '@playwright/test/reporter';

type Failure = { title: string; message: string };

const REPORT = 'test/.results/outer.json';
const MAX_MESSAGE = 3000;
const ANSI_COLOR = new RegExp(String.raw`${String.fromCharCode(27)}\[[0-9;]*m`, 'g');

const lines: string[] = [`## 시나리오 (${process.env.SCENARIO_LABEL ?? 'local'})`, ''];
if (existsSync(REPORT)) {
  const report = JSON.parse(readFileSync(REPORT, 'utf8')) as JSONReport;
  const failures = report.suites.flatMap((suite) => failuresOf(suite, []));
  const { expected, unexpected, flaky } = report.stats;
  lines.push(`통과 ${String(expected)} · 실패 ${String(unexpected)} · flaky ${String(flaky)}`, '');
  for (const failure of failures) {
    lines.push(
      `<details><summary>${failure.title}</summary>`,
      '',
      '```diff',
      failure.message,
      '```',
      '</details>',
      '',
    );
  }
} else {
  lines.push('시나리오 결과 파일이 없습니다. 실행 로그를 확인하세요.');
}
const summary = `${lines.join('\n')}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
else console.log(summary);

/**
 * Collects unexpected results with their titles and first error.
 * @param suite Suite of the outer JSON report.
 * @param titles Titles of the parent suites.
 */
function failuresOf(suite: JSONReportSuite, titles: string[]): Failure[] {
  const path = suite.file === suite.title ? titles : [...titles, suite.title];
  const own = suite.specs.flatMap((spec) =>
    spec.tests
      .filter((test) => test.status === 'unexpected')
      .map((test) => ({
        title: [...path, spec.title].join(' › '),
        message: clean(test.results.at(-1)?.errors[0]?.message ?? ''),
      })),
  );
  return [...own, ...(suite.suites ?? []).flatMap((child) => failuresOf(child, path))];
}

/**
 * Removes terminal colors and shortens long messages.
 * @param message Error message from the report.
 */
function clean(message: string): string {
  const plain = message.replace(ANSI_COLOR, '');
  return plain.length > MAX_MESSAGE ? `${plain.slice(0, MAX_MESSAGE)}\n…` : plain;
}
