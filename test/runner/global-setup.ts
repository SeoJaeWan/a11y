import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

import type { RunnerCase } from './load-scenarios';
import { groupDir, loadCases } from './load-scenarios';
import { RESULTS_DIR, TEST_DIR } from './paths';

const PLAYWRIGHT_CLI = createRequire(import.meta.url).resolve('@playwright/test/cli');

/**
 * Runs the E2E files of the selected cases the way a user would, one inner run per group.
 * The outer tests then only read the files these runs leave.
 */
export default async function runInner(): Promise<void> {
  const cases = await loadCases();
  const filter = readGrepArgs(process.argv);
  const selected = cases.filter((testCase) => isSelected(testCase, filter));
  rmSync(RESULTS_DIR, { recursive: true, force: true });

  const groups = new Map<string, RunnerCase[]>();
  for (const testCase of selected) {
    groups.set(testCase.group, [...(groups.get(testCase.group) ?? []), testCase]);
  }
  for (const [group, groupCases] of groups) {
    const dir = groupDir(group);
    mkdirSync(dir, { recursive: true });
    const first = groupCases[0];
    if (!first) continue;
    const files = [...new Set(groupCases.map((testCase) => testCase.case.e2e))];
    const result = spawnSync(
      process.execPath,
      [
        PLAYWRIGHT_CLI,
        'test',
        '--config',
        first.config,
        '--output',
        path.join(dir, 'test-results'),
        // Playwright reads file filters as regular expressions, so keep `/` on Windows too.
        ...files.map((file) => path.posix.relative('e2e', file)),
      ],
      {
        cwd: TEST_DIR,
        stdio: 'inherit',
        env: innerEnv(first.env, path.join(dir, 'report.json')),
      },
    );
    writeFileSync(
      path.join(dir, 'run.json'),
      JSON.stringify({ exitCode: result.status, files }, null, 2),
    );
  }
}

type GrepFilter = { grep: RegExp | undefined; grepInvert: RegExp | undefined };

/**
 * Reads `--grep` and `--grep-invert` from the outer command line. Playwright does not pass the
 * CLI filters to the global setup, so the setup reads them itself to run only what is selected.
 * @param argv Command line of the outer run.
 */
function readGrepArgs(argv: string[]): GrepFilter {
  return {
    grep: readRegExpArg(argv, ['--grep', '-g']),
    grepInvert: readRegExpArg(argv, ['--grep-invert', '-gv']),
  };
}

/**
 * Reads one regular expression option, as `--name value` or `--name=value`.
 * @param argv Command line of the outer run.
 * @param names Long and short names of the option.
 */
function readRegExpArg(argv: string[], names: string[]): RegExp | undefined {
  for (const [index, arg] of argv.entries()) {
    const name = names.find((item) => arg === item || arg.startsWith(`${item}=`));
    if (!name) continue;
    const value = arg === name ? argv[index + 1] : arg.slice(name.length + 1);
    return value === undefined ? undefined : new RegExp(value);
  }
  return undefined;
}

/**
 * Applies the outer filters to the tests a case feeds: the case itself and its plain run check.
 * @param testCase Case to check.
 * @param filter Filters from the outer command line.
 */
function isSelected(testCase: RunnerCase, filter: GrepFilter): boolean {
  const titles = [testCase.titles.join(' '), `일반 실행 ${testCase.case.e2e}`];
  return titles.some(
    (title) => (filter.grep?.test(title) ?? true) && !(filter.grepInvert?.test(title) ?? false),
  );
}

/**
 * Builds the environment of an inner run: this process's variables with the case settings applied.
 * @param settings Variables of the case group; `null` removes one.
 * @param reportPath Where the Playwright JSON report goes.
 */
function innerEnv(settings: Record<string, string | null>, reportPath: string): NodeJS.ProcessEnv {
  const removed = new Set(
    Object.entries(settings)
      .filter(([, value]) => value === null)
      .map(([name]) => name),
  );
  const kept = Object.entries(process.env).filter(([name]) => !removed.has(name));
  const added = Object.entries(settings).filter(([, value]) => value !== null);
  return Object.fromEntries([
    ...kept,
    ...added,
    ['PLAYWRIGHT_JSON_OUTPUT_FILE', reportPath],
  ]) as NodeJS.ProcessEnv;
}
