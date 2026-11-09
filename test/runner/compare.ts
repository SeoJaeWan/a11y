import type { JsonObject, JsonValue } from './json';

/**
 * Prepares a test record for a piece comparison: `stops` lists become objects keyed by
 * `index`, so a piece case can name only the stops it checks.
 * @param value Expected fields or the actual test record.
 */
export function pairStopsByIndex(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return value.map(pairStopsByIndex);
  if (value === null || typeof value !== 'object') return value;
  const result: JsonObject = {};
  for (const [key, child] of Object.entries(value)) {
    result[key] =
      key === 'stops' && Array.isArray(child) ? stopsByIndex(child) : pairStopsByIndex(child);
  }
  return result;
}

/**
 * Keys each stop by its `index` field.
 * @param stops Tab stops of one step.
 */
function stopsByIndex(stops: JsonValue[]): JsonObject {
  const result: JsonObject = {};
  for (const stop of stops) {
    const index =
      typeof stop === 'object' && stop !== null && !Array.isArray(stop) ? stop.index : undefined;
    result[`#${JSON.stringify(index ?? null)}`] = pairStopsByIndex(stop);
  }
  return result;
}

/** Key attempts listed by a piece case, with the step they belong to. */
export type StepAttempts = { step: number; attempts: JsonValue };

/**
 * Lists the `attempts` a piece case names. These are compared in full, order included.
 * @param expected Expected fields of a piece case.
 */
export function expectedAttempts(expected: JsonObject): StepAttempts[] {
  const steps = expected.steps;
  if (!Array.isArray(steps)) return [];
  return steps.flatMap((step, index) => {
    if (typeof step !== 'object' || step === null || Array.isArray(step)) return [];
    const keyboard = step.keyboard;
    if (typeof keyboard !== 'object' || keyboard === null || Array.isArray(keyboard)) return [];
    return keyboard.attempts === undefined ? [] : [{ step: index, attempts: keyboard.attempts }];
  });
}
