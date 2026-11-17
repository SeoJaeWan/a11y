import { createHash } from 'node:crypto';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import type { Scenario, ScenarioCase } from './define-scenario';
import { DEFAULT_CONFIG, RESULTS_DIR, SCENARIO_DIR } from './paths';

/** A case ready to run: where its titles, E2E file, and results are. */
export type RunnerCase = {
  /** Outer test titles: group name, situation. */
  titles: [string, string];
  case: ScenarioCase;
  /** Cases with the same run settings run together in one inner run. */
  group: string;
  config: string;
  env: Record<string, string | null>;
};

type ScenarioModule = { scenario?: Scenario };

/** Reads every `*.scenario.ts` under test/scenarios/cases and lists their cases. */
export async function loadCases(): Promise<RunnerCase[]> {
  const cases: RunnerCase[] = [];
  const dir = path.join(SCENARIO_DIR, 'cases');
  // A fresh checkout has no scenario folder until the first case is written.
  const entries = await readdir(dir).catch(() => []);
  const files = entries.filter((file) => file.endsWith('.scenario.ts')).sort();
  for (const file of files) {
    const module = (await import(pathToFileURL(path.join(dir, file)).href)) as ScenarioModule;
    if (!module.scenario) throw new Error(`cases/${file} must export "scenario"`);
    cases.push(...toRunnerCases(module.scenario));
  }
  return cases;
}

/**
 * Turns the cases of one scenario into runner cases with titles and groups.
 * @param scenario Scenario read from a definition file.
 */
function toRunnerCases(scenario: Scenario): RunnerCase[] {
  return scenario.cases.map((testCase) => {
    const config = testCase.config ?? DEFAULT_CONFIG;
    const env = { A11Y: '1', ...testCase.env };
    return {
      titles: [scenario.name, testCase.situation],
      case: testCase,
      group: groupName(config, env),
      config,
      env,
    };
  });
}

/**
 * Builds a stable folder name for cases that share run settings.
 * @param config Playwright config relative to test/.
 * @param env Environment variables of the inner run.
 */
function groupName(config: string, env: Record<string, string | null>): string {
  const isDefault = config === DEFAULT_CONFIG && Object.keys(env).length === 1 && env.A11Y === '1';
  if (isDefault) return 'default';
  const key = JSON.stringify([config, Object.entries(env).sort()]);
  return `group-${createHash('sha1').update(key).digest('hex').slice(0, 8)}`;
}

/**
 * Says where the inner run of a group writes its files.
 * @param group Group name from {@link RunnerCase.group}.
 */
export function groupDir(group: string): string {
  return path.join(RESULTS_DIR, group);
}
