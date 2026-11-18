import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { TestInfo } from '@playwright/test';

/** Comment above a test that names the test covering the same work with the keyboard. */
const COMMENT = /^\s*\/\/\s*a11y-alternative:\s*(.+?)\s*$/;
const TEST_FILE = /\.[cm]?[jt]sx?$/;

const sourcesByDir = new Map<string, string[]>();

/**
 * Reads the title a comment right above a test points at.
 * @param source Text of the test file.
 * @param testLine Line of the `test(...)` call, counted from 1.
 */
export function readAlternativeTitle(source: string, testLine: number): string | undefined {
  const above = source.split(/\r?\n/)[testLine - 2] ?? '';
  return COMMENT.exec(above)?.[1];
}

/**
 * Says whether some test file writes the title as a string. The comment that points at the
 * title does not count.
 * @param sources Texts of the test files.
 * @param title Test title to look for.
 */
export function hasTestTitle(sources: readonly string[], title: string): boolean {
  const quoted = [`'${title}'`, `"${title}"`, `\`${title}\``];
  return sources.some((source) =>
    source
      .split(/\r?\n/)
      .some((line) => !COMMENT.test(line) && quoted.some((text) => line.includes(text))),
  );
}

/**
 * Hands a test over to the test its comment names: the test is skipped in the keyboard run and
 * the named test stands in for it. A comment that names no existing test fails the test, so a
 * renamed or deleted stand-in does not go unnoticed.
 * @param testInfo Test that is starting.
 */
export function useAlternative(testInfo: TestInfo): void {
  const title = readAlternativeTitle(readFileSync(testInfo.file, 'utf8'), testInfo.line);
  if (title === undefined) return;
  if (!hasTestTitle(readSources(testInfo.project.testDir), title)) {
    const error = new Error(
      `주석이 가리킨 대안 테스트를 찾지 못했습니다: ${title}\n` +
        '테스트 폴더에서 이 제목의 테스트를 찾을 수 없습니다. 제목이 바뀌었거나 지워졌는지 확인하세요.',
    );
    const place = `${testInfo.file}:${String(testInfo.line)}:${String(testInfo.column)}`;
    error.stack = `${error.name}: ${error.message}\n    at ${place}`;
    throw error;
  }
  testInfo.skip(true, `대안 테스트로 대체: ${title}`);
}

/**
 * Reads every test file under a folder once per worker.
 * @param testDir Test folder of the project.
 */
function readSources(testDir: string): string[] {
  let sources = sourcesByDir.get(testDir);
  if (!sources) {
    sources = readdirSync(testDir, { recursive: true, encoding: 'utf8' })
      .filter((file) => TEST_FILE.test(file) && !file.includes('node_modules'))
      .map((file) => readFileSync(path.join(testDir, file), 'utf8'));
    sourcesByDir.set(testDir, sources);
  }
  return sources;
}
