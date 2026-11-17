# Journey A11y

English | [한국어](README.ko.md)

> Not published to npm yet.

Journey A11y is a Playwright extension that takes your existing end-to-end tests, leaves them unchanged, runs their actions with the keyboard instead of the mouse, and checks whether each journey can be completed keyboard-only.

Accessibility checkers look at rules one element at a time. Journey A11y looks at the journey your E2E test already describes: a test that passes with the mouse tells you where it gets stuck with the keyboard.

## What it checks

For every action line of your E2E test, such as `click()` or `fill()`:

- **Reach**: can Tab and the arrow keys bring focus to the element the test points at.
- **Activation**: does a key such as Enter or Space act on it.
- **Same result**: do the next lines and `expect` calls of your test still pass.

When the target cannot be reached, the test fails on that line and says why. Messages are in Korean for now.

```text
Error: 키보드로 닿을 수 없습니다: getByText('쿠폰 받기')
목표 <div class="button">은(는) 포커스를 받을 수 없는 요소입니다.

  > 5 |   await page.getByText('쿠폰 받기').click();
```

Every test gets a text attachment, "키보드 실행", that lists what the keyboard did on each line:

```text
5행 click 통과: Tab 4번, button "예약 취소"에서 Enter
6행 click 통과: Tab 1번, button "취소 확정"에서 Enter
```

Actions with no keyboard way yet, such as drag and double-click, run the original way and are reported as not checked, in the attachment and in the terminal. It does not judge whether the Tab order is natural, whether focus is visible, or whether names are announced.

## Usage

No changes to your test files. Wrap your existing Playwright config once and turn the run on when you want it:

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { withA11y } from 'journey-a11y';

export default defineConfig(
  withA11y({
    projects: [{ name: 'chromium' }],
  }),
);
```

```bash
A11Y=1 npx playwright test
```

Without `A11Y`, your test run is unchanged. With it, every project that runs in Chromium gets a keyboard-only copy that keeps the project's settings, such as the signed-in state. Results appear in the regular Playwright report.

It supports Chromium and Playwright `>=1.54 <2`.

## Design documents

The design is written in Korean under [`.codocs/`](.codocs/journey-a11y.yaml).

## License

[MIT](LICENSE)
