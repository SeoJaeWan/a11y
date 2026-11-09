import { defineConfig } from '@playwright/test';

import config from './playwright.config';

// A project that runs every test in a single worker.
export default defineConfig(config, {
  workers: 1,
});
