import type { JsonObject } from './json';

/** One condition of a tool behavior, with the values a case may change it to. */
export type Condition = {
  label: string;
  values: readonly string[];
  base: string;
};

/** Settings that make a case run apart from the default group. */
export type RunSettings = {
  /** Playwright config to run the E2E with, relative to test/. Defaults to playwright.config.ts. */
  config?: string;
  /** Extra environment variables. `A11Y` is `1` unless given here; `null` removes a variable. */
  env?: Record<string, string | null>;
};

type CaseBase = RunSettings & {
  id: string;
  /** E2E file relative to test/, e.g. `e2e/cases/reach/plain-button.spec.ts`. */
  e2e: string;
  /** The tool does not do this yet: the case is expected to fail until it does. */
  todo?: boolean;
};

/** A common piece case: compares only the fields it lists. */
export type PieceCase = CaseBase & {
  /** Condition changed from its base value. Empty for the base case. */
  change: Record<string, string>;
  expected: JsonObject;
};

/** An E2E scenario case: compares the whole test record. */
export type E2eCase = CaseBase & {
  /** The line of the real-world situation list this case covers. */
  situation: string;
  /** Expected test record, relative to test/. */
  expected: string;
};

/** Common piece scenario: one tool behavior. */
export type PieceScenario = {
  kind: 'piece';
  name: string;
  conditions: Record<string, Condition>;
  cases: PieceCase[];
  /** Condition values with no case, and why. */
  noCase: Record<string, Record<string, string>>;
};

/** E2E scenario cases of one group (reach, run, info, flow). */
export type E2eScenario = {
  kind: 'e2e';
  name: string;
  cases: E2eCase[];
};

export type Scenario = PieceScenario | E2eScenario;

/**
 * Declares a common piece scenario.
 * @param scenario Behavior name, conditions, cases, and values left without a case.
 */
export function definePieceScenario(scenario: Omit<PieceScenario, 'kind'>): PieceScenario {
  return { kind: 'piece', ...scenario };
}

/**
 * Declares the E2E scenario cases of one group.
 * @param scenario Group name and its cases.
 */
export function defineE2eScenario(scenario: Omit<E2eScenario, 'kind'>): E2eScenario {
  return { kind: 'e2e', ...scenario };
}
