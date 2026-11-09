import { defineConfig } from '@playwright/test';

import config from './playwright.config';

// A project that marks test ids with `data-qa` instead of `data-testid`.
export default defineConfig(config, {
  use: { testIdAttribute: 'data-qa' },
});
