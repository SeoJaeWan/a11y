import path from 'node:path';

export const TEST_DIR = path.resolve(import.meta.dirname, '..');
export const SCENARIO_DIR = path.join(TEST_DIR, 'scenarios');
// Parallel runs on one machine can set their own folders.
export const RESULTS_DIR = path.resolve(
  process.env.SCENARIO_RESULTS_DIR ?? path.join(TEST_DIR, '.results'),
);
export const REPORT_DIR = path.resolve(
  process.env.SCENARIO_REPORT_DIR ?? path.join(TEST_DIR, '.report'),
);
export const DEFAULT_CONFIG = 'playwright.config.ts';
