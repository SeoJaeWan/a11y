import { defineConfig } from '@playwright/test';
import { a11yProjects } from 'journey-a11y';

import config from './playwright.config';

const plainProjects = (config.projects ?? []).filter((project) => project.name === 'chromium');

// A project that lowers the Tab limit of the accessibility run to 3.
// The project list is written out in full: older Playwright versions replace `projects` in
// `defineConfig(config, overrides)` instead of merging them by name.
export default defineConfig(config, {
  projects: [
    ...plainProjects,
    // @ts-expect-error -- `maxTabs` is not implemented yet; remove this line when it is.
    ...a11yProjects({ maxTabs: 3 }),
  ],
});
