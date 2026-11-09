import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('픽업 일시를 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-datetime-local');
  await page.getByLabel('픽업 일시').fill('2026-12-24T14:30');
  await expect(page.getByLabel('픽업 일시')).toHaveValue('2026-12-24T14:30');
});
