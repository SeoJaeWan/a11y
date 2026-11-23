import { expect, test } from '@playwright/test';

import { loadCases } from './load-scenarios';
import { readInnerResult } from './read-results';

const cases = await loadCases();

for (const scenarioName of new Set(cases.map((testCase) => testCase.titles[0]))) {
  test.describe(scenarioName, () => {
    for (const testCase of cases.filter((item) => item.titles[0] === scenarioName)) {
      test(testCase.titles[1], async () => {
        const testInfo = test.info();
        // The inner run uses a browser on this machine, so this machine tells which one applies.
        const expected =
          process.platform === 'darwin' && testCase.case.expectedOnMac
            ? testCase.case.expectedOnMac
            : testCase.case.expected;
        const result = readInnerResult(testCase.group, testCase.case.e2e);
        if (result.tracePath) {
          await testInfo.attach('trace', {
            path: result.tracePath,
            contentType: 'application/zip',
          });
        }
        await testInfo.attach('expected.json', {
          body: JSON.stringify(expected, null, 2),
          contentType: 'application/json',
        });
        await testInfo.attach('actual.json', {
          body: JSON.stringify(result.actual ?? null, null, 2),
          contentType: 'application/json',
        });
        if (expected === 'no-a11y-run') {
          expect(result.a11y, 'no accessibility test must run for this E2E').toBeUndefined();
          return;
        }
        expect(result.actual, 'the accessibility run left no result for this E2E').toBeDefined();
        const { error: actualError, ...actual } = result.actual ?? {};
        const { error: expectedError, ...expectedRest } = expected;
        expect(actual).toEqual(expectedRest);
        // Error messages carry call logs and timings, so the case names only the text that matters.
        if (expectedError !== undefined) expect(actualError ?? '').toContain(expectedError);
      });
    }
  });
}

test.describe('일반 실행', () => {
  for (const e2e of new Set(cases.map((testCase) => testCase.case.e2e))) {
    const testCase = cases.find((item) => item.case.e2e === e2e);
    if (!testCase) continue;
    test(e2e, () => {
      const result = readInnerResult(testCase.group, e2e);
      expect(result.plain, 'no plain (chromium) result for this E2E').toBeDefined();
      expect(result.plain?.status, 'the E2E must pass without the tool').toBe('expected');
    });
  }
});
