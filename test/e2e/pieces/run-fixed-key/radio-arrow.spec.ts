import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('당일 배송을 고른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/radio-arrow');
  await page.getByRole('radio', { name: '당일 배송' }).check();
  await expect(page.getByRole('status')).toHaveText('배송비 5,000원');
});
