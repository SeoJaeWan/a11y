import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('체크인 날짜를 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-date');
  await page.getByLabel('체크인').fill('2026-12-24');
  await expect(page.getByLabel('체크인')).toHaveValue('2026-12-24');
});
