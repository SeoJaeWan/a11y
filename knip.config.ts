import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: [
    'test/*.config.ts',
    'test/e2e/**/*.spec.ts',
    'test/scenarios/**/*.scenario.ts',
    'test/tools/*.mjs',
  ],
  ignoreExportsUsedInFile: true,
};

export default config;
