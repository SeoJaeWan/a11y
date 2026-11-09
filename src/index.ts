import type { Project } from '@playwright/test';

/**
 * Returns the Playwright projects that run tests keyboard-only.
 * Returns an empty list until accessibility runs are implemented.
 */
export function a11yProjects(): Project[] {
  return [];
}
