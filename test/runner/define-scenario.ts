/** Settings that make a case run apart from the default group. */
export type RunSettings = {
  /** Playwright config to run the E2E with, relative to test/. Defaults to playwright.config.ts. */
  config?: string;
  /** Extra environment variables. `A11Y` is `1` unless given here; `null` removes a variable. */
  env?: Record<string, string | null>;
};

/** What the tool leaves in Playwright for one test of an accessibility run. */
export type Expected = {
  status: 'passed' | 'failed' | 'skipped';
  /** Reason the tool gives for skipping the test. Left out for a test that ran. */
  skipped?: string;
  /** Text the error message of a failed test contains. Left out for a passed test. */
  error?: string;
  /** Lines of the "키보드 실행" attachment, one per action line of the E2E. */
  lines: string[];
  /** Terminal lines that say a line was not checked with the keyboard. */
  notices: string[];
};

/** Expected when the accessibility run is off: no accessibility test runs for the E2E. */
export type NoA11yRun = 'no-a11y-run';

/** One scenario case: a page, a plain E2E, and what the tool leaves for it. */
export type ScenarioCase = RunSettings & {
  id: string;
  /** The line of the real-world situation list this case covers. */
  situation: string;
  /** E2E file relative to test/, e.g. `e2e/cases/reach/plain-button.spec.ts`. */
  e2e: string;
  expected: Expected | NoA11yRun;
};

/** Scenario cases of one group (reach, run, toggle). */
export type Scenario = {
  name: string;
  cases: ScenarioCase[];
};

/**
 * Declares the scenario cases of one group.
 * @param scenario Group name and its cases.
 */
export function defineE2eScenario(scenario: Scenario): Scenario {
  return scenario;
}
