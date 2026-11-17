import path from 'node:path';

import { defineConfig, devices } from '@playwright/test';
import { withA11y } from 'journey-a11y';

const SIGNED_IN_STATE = path.join(import.meta.dirname, '.auth', 'user.json');

// A user-style config with sign-in: a setup project signs in first, and the tests start signed in.
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
    projects: [
      { name: 'setup', testMatch: /setup[\\/].*\.setup\.ts/ },
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'], storageState: SIGNED_IN_STATE },
        dependencies: ['setup'],
      },
    ],
  }),
);
