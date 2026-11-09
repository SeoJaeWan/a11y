import { readFileSync } from 'node:fs';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import { expectedAttempts, pairStopsByIndex } from './compare';
import type { PieceScenario } from './define-scenario';
import type { JsonObject } from './json';
import type { RunnerCase } from './load-scenarios';
import { loadCases } from './load-scenarios';
import { TEST_DIR } from './paths';
import { readInnerResult } from './read-results';

const cases = await loadCases();

for (const [kind, scenarioName] of uniqueTitles(cases)) {
  test.describe(kind, () => {
    test.describe(scenarioName, () => {
      const scenarioCases = cases.filter(
        (testCase) => testCase.titles[0] === kind && testCase.titles[1] === scenarioName,
      );
      for (const testCase of scenarioCases) {
        test(testCase.titles[2], async () => {
          const testInfo = test.info();
          test.fail(testCase.case.todo === true, '구현 전');
          const result = readInnerResult(testCase.group, testCase.case.e2e);
          if (result.tracePath) {
            await testInfo.attach('trace', {
              path: result.tracePath,
              contentType: 'application/zip',
            });
          }
          const expected = readExpected(testCase);
          await testInfo.attach('expected.json', {
            body: JSON.stringify(expected, null, 2),
            contentType: 'application/json',
          });
          await testInfo.attach('actual.json', {
            body: JSON.stringify(result.record ?? null, null, 2),
            contentType: 'application/json',
          });
          expect(result.record, 'a11y-results.json has no record for this E2E').toBeDefined();
          compare(testCase, expected, result.record ?? {});
        });
      }
      const [first] = scenarioCases;
      if (first?.scenario.kind === 'piece') {
        const scenario = first.scenario;
        test('조건 값마다 케이스나 이유가 있다', () => {
          expect(missingValues(scenario)).toEqual([]);
        });
      }
    });
  });
}

test.describe('일반 실행', () => {
  for (const e2e of [...new Set(cases.map((testCase) => testCase.case.e2e))]) {
    const testCase = cases.find((item) => item.case.e2e === e2e);
    if (!testCase) continue;
    test(e2e, () => {
      const result = readInnerResult(testCase.group, e2e);
      expect(result.plain, 'no plain (chromium) result for this E2E').toBeDefined();
      expect(result.plain?.status, 'the E2E must pass without the tool').toBe('expected');
    });
  }
});

/**
 * Lists each kind and scenario name once, in order.
 * @param allCases Every runner case.
 */
function uniqueTitles(allCases: RunnerCase[]): [string, string][] {
  const keys = [
    ...new Set(allCases.map((testCase) => JSON.stringify(testCase.titles.slice(0, 2)))),
  ];
  return keys.map((key) => JSON.parse(key) as [string, string]);
}

/**
 * Reads what a case expects: listed fields for a piece, the whole record file for an E2E case.
 * @param testCase Case to read.
 */
function readExpected(testCase: RunnerCase): JsonObject {
  if ('situation' in testCase.case) {
    return JSON.parse(
      readFileSync(path.join(TEST_DIR, testCase.case.expected), 'utf8'),
    ) as JsonObject;
  }
  return testCase.case.expected;
}

/**
 * Compares a record the way its scenario kind says: listed fields for pieces, all for E2E cases.
 * @param testCase Case being checked.
 * @param expected Expected fields or record.
 * @param actual Test record from `a11y-results.json`.
 */
function compare(testCase: RunnerCase, expected: JsonObject, actual: JsonObject): void {
  if (testCase.scenario.kind === 'e2e') {
    expect(actual).toEqual(expected);
    return;
  }
  expect(pairStopsByIndex(actual)).toMatchObject(
    pairStopsByIndex(expected) as Record<string, unknown>,
  );
  const steps = Array.isArray(actual.steps) ? actual.steps : [];
  for (const { step, attempts } of expectedAttempts(expected)) {
    const actualStep = steps[step];
    const keyboard =
      typeof actualStep === 'object' && actualStep !== null && !Array.isArray(actualStep)
        ? actualStep.keyboard
        : undefined;
    const actualAttempts =
      typeof keyboard === 'object' && keyboard !== null && !Array.isArray(keyboard)
        ? keyboard.attempts
        : undefined;
    expect(actualAttempts, `steps[${String(step)}].keyboard.attempts`).toEqual(attempts);
  }
}

/**
 * Finds condition values that have neither a case nor a reason.
 * @param scenario Piece scenario to check.
 */
function missingValues(scenario: PieceScenario): string[] {
  const missing: string[] = [];
  for (const [name, condition] of Object.entries(scenario.conditions)) {
    for (const value of condition.values) {
      const isBase = value === condition.base;
      const hasCase = scenario.cases.some((testCase) =>
        isBase ? Object.keys(testCase.change).length === 0 : testCase.change[name] === value,
      );
      const hasReason = scenario.noCase[name]?.[value] !== undefined;
      if (!hasCase && !hasReason) missing.push(`${condition.label}: ${value}`);
    }
  }
  return missing;
}
