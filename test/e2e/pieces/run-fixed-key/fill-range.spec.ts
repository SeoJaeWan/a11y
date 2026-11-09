import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('음량을 맞춘다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-range');
  await page.getByLabel('음량').fill('8');
  await expect(page.getByLabel('음량')).toHaveValue('8');
});
