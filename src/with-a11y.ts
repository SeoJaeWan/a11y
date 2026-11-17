import type { PlaywrightTestConfig } from '@playwright/test';

import { interceptInProject } from './playwright-internal/intercept-in-project';
import { handleAction } from './run/handle-action';
import { closeSummary, openSummary, SUMMARY_NAME } from './run/summary';

type ProjectConfig = NonNullable<PlaywrightTestConfig['projects']>[number];

const DEFAULT_TEST_ID_ATTRIBUTE = 'data-testid';

/**
 * Adds the keyboard-only run to a Playwright config. Wrap the whole config with it:
 * `export default defineConfig(withA11y({ ... }))`.
 *
 * Nothing changes unless the `A11Y` environment variable is set. When it is, every project that
 * runs tests in Chromium gets a copy that runs the same tests with the keyboard. The copy keeps
 * the project's settings, such as the signed-in state and the projects it depends on.
 * @param config Playwright config of the user's tests.
 */
export function withA11y(config: PlaywrightTestConfig): PlaywrightTestConfig {
  if (!process.env.A11Y) return config;
  // A config without projects has one unnamed project; it must stay next to its copy.
  const projects: ProjectConfig[] = config.projects?.length ? config.projects : [{}];
  const helperNames = new Set(projects.flatMap(namesOfHelpers));
  const bases = projects.filter(
    (project) => !helperNames.has(project.name ?? '') && runsInChromium(project, config),
  );
  const copies = bases.map((project) => ({
    ...project,
    name: bases.length === 1 ? 'a11y' : `a11y-${project.name ?? ''}`,
    use: {
      ...project.use,
      ...interceptInProject(
        {
          onAction: handleAction,
          onTestStart: (testInfo) => {
            openSummary(testInfo.testId);
          },
          onTestEnd: async (testInfo) => {
            await testInfo.attach(SUMMARY_NAME, {
              body: closeSummary(testInfo.testId),
              contentType: 'text/plain',
            });
          },
        },
        project.use?.testIdAttribute ?? config.use?.testIdAttribute ?? DEFAULT_TEST_ID_ATTRIBUTE,
      ),
    },
  }));
  return { ...config, projects: [...projects, ...copies] };
}

/**
 * Lists the projects another project runs before or after itself. Those only prepare or clean
 * up, such as a sign-in project, so they are not copied.
 * @param project Project of the user's config.
 */
function namesOfHelpers(project: ProjectConfig): string[] {
  return [
    ...(project.dependencies ?? []),
    ...(project.teardown === undefined ? [] : [project.teardown]),
  ];
}

/**
 * Says whether a project runs in Chromium. Keys are sent through Chromium's DevTools protocol.
 * @param project Project of the user's config.
 * @param config Config the project belongs to, for the shared settings.
 */
function runsInChromium(project: ProjectConfig, config: PlaywrightTestConfig): boolean {
  const browser =
    project.use?.browserName ??
    project.use?.defaultBrowserType ??
    config.use?.browserName ??
    config.use?.defaultBrowserType ??
    'chromium';
  return browser === 'chromium';
}
