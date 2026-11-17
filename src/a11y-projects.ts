import type { Project } from '@playwright/test';

import { interceptInProject } from './playwright-internal/intercept-in-project';
import { handleAction } from './run/handle-action';
import { closeSummary, openSummary, SUMMARY_NAME } from './run/summary';

/**
 * Returns the Playwright project that re-runs the tests keyboard-only.
 * It is empty unless the `A11Y` environment variable is set, so installing the package changes
 * nothing about an existing test run.
 */
export function a11yProjects(): Project[] {
  if (!process.env.A11Y) return [];
  return [
    {
      name: 'a11y',
      use: interceptInProject({
        onAction: handleAction,
        onTestStart: (testInfo) => {
          openSummary(testInfo.testId);
        },
        onTestEnd: async (testInfo) => {
          await testInfo.attach(SUMMARY_NAME, {
            body: closeSummary(testInfo.testId),
            contentType: 'text/plain',
          });
        },
      }),
    },
  ];
}
