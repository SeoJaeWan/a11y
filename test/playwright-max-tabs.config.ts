import { defineConfig } from '@playwright/test';
import { a11yProjects } from 'journey-a11y';

import config from './playwright.config';

// A project that lowers the Tab limit of the accessibility run to 3.
export default defineConfig(config, {
  // @ts-expect-error -- `maxTabs` is not implemented yet; remove this line when it is.
  projects: a11yProjects({ maxTabs: 3 }),
});
