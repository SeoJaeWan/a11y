import type { Locator } from '@playwright/test';

/**
 * Writes a locator the way Playwright prints it in its own errors, e.g. `getByText('저장')`.
 * The method exists on the locator but is missing from the public types.
 * @param locator Locator to write.
 */
export function describeLocator(locator: Locator): string {
  return (locator as unknown as { toString: () => string }).toString();
}
