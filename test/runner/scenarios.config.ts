import { defineConfig } from '@playwright/test';

import { REPORT_DIR, RESULTS_DIR } from './paths';

// Outer run: compares what the inner runs (global setup) left. It opens no browser.
export default defineConfig({
  testDir: '.',
  testMatch: 'run-scenarios.spec.ts',
  globalSetup: './global-setup.ts',
  outputDir: `${RESULTS_DIR}/outer`,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { outputFolder: REPORT_DIR, open: 'never' }],
    ['json', { outputFile: `${RESULTS_DIR}/outer.json` }],
  ],
});
