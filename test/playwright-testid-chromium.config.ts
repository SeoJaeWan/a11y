import { defineConfig } from '@playwright/test';

import config from './playwright.config';

// A project that sets `testIdAttribute: 'data-qa'` on its chromium project only.
export default defineConfig(config, {
  projects: [{ name: 'chromium', use: { testIdAttribute: 'data-qa' } }],
});
