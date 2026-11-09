import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('수량을 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-number');
  await page.getByLabel('수량').fill('3');
  await expect(page.getByLabel('수량')).toHaveValue('3');
});
