import { test } from '@playwright/test';

/** Name of the text attachment that lists what the keyboard did on each action line. */
export const SUMMARY_NAME = '키보드 실행';

const linesByTest = new Map<string, string[]>();

/**
 * Starts an empty summary for a test.
 * @param testId Id of the test that is starting.
 */
export function openSummary(testId: string): void {
  linesByTest.set(testId, []);
}

/**
 * Adds a line for the action that is starting and returns a way to rewrite its text. The line
 * is written first with what to say if the action never gets further.
 * @param prefix Line number and action name, e.g. `5행 click`.
 * @param text What to say until the action sets a result.
 */
export function reserveLine(prefix: string, text: string): (next: string) => void {
  const lines = linesByTest.get(test.info().testId) ?? [];
  const index = lines.push(`${prefix} ${text}`) - 1;
  return (next) => {
    lines[index] = `${prefix} ${next}`;
  };
}

/**
 * Ends the summary of a test and returns its text.
 * @param testId Id of the test that is ending.
 */
export function closeSummary(testId: string): string {
  const lines = linesByTest.get(testId) ?? [];
  linesByTest.delete(testId);
  return lines.join('\n');
}
