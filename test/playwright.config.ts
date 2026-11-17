import { defineConfig, devices } from '@playwright/test';
import { withA11y } from 'journey-a11y';

// A user-style config: the scenario runner runs test/e2e with it, plain and with A11Y=1.
export default defineConfig(
  withA11y({
    testDir: './e2e',
    fullyParallel: true,
    reporter: [['list'], ['json']],
    use: {
      baseURL: 'http://localhost:5174',
      trace: 'on',
    },
    webServer: [
      {
        command: 'pnpm dev:app',
        url: 'http://localhost:5174',
        reuseExistingServer: true,
      },
    ],
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  }),
);
