import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('유효 기간을 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-month');
  await page.getByLabel('유효 기간').fill('2028-07');
  await expect(page.getByLabel('유효 기간')).toHaveValue('2028-07');
});
