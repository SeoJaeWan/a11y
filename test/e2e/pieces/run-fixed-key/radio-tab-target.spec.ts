import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('카드 결제를 고른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/radio-tab-target');
  await page.getByRole('radio', { name: '카드' }).check();
  await expect(page.getByRole('radio', { name: '카드' })).toBeChecked();
});
