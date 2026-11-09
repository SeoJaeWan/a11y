import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['test/playwright.config.ts', 'test/e2e/**/*.spec.ts', 'test/scenarios/**/*.scenario.ts'],
  ignoreExportsUsedInFile: true,
};

export default config;
