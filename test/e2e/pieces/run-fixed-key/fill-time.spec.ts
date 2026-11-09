import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('도착 시간을 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-time');
  await page.getByLabel('도착 시간').fill('14:30');
  await expect(page.getByLabel('도착 시간')).toHaveValue('14:30');
});
