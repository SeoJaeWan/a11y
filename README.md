# Journey A11y

English | [한국어](README.ko.md)

> In design; there is no code to install yet.

Journey A11y is a Playwright extension that re-runs your existing end-to-end tests the way a keyboard-only user would, and records what that user experiences on each step.

Accessibility checkers look at rules one element at a time. Journey A11y looks at the journey your E2E test already describes: can a keyboard user reach each target, can they activate it, and what is announced along the way.

## What it records

For every step of your E2E test, such as `click()` or `fill()`:

- **Reach**: how many Tab and arrow-key presses it took to get to the target, or that it could not be reached.
- **Activation**: which key worked (Enter, Space, a declared shortcut), and whether the next step of your test still passed.
- **What is conveyed**: role, name, name source, and state of every stop on the way.
- **Flow**: where focus starts on the next step, for example after a dialog opens or the page changes.

It observes and records. It does not score your site or decide what counts as a problem; that call stays with you.

## Planned usage

No changes to your test files. Add the projects to your existing Playwright config and turn them on when you want them:

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { a11yProjects } from 'journey-a11y';

export default defineConfig({
  projects: [{ name: 'chromium' }, ...a11yProjects()],
});
```

```bash
A11Y=1 npx playwright test
```

Results appear in the regular Playwright HTML report, with a JSON record next to it.

The first version targets Chromium and Playwright `>=1.54 <2`.

## Design documents

The design is written in Korean under [`.codocs/`](.codocs/journey-a11y.yaml).

## License

[MIT](LICENSE)
