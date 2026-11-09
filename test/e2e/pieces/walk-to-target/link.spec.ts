import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('환불 규정으로 이동한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/link');
  await page.getByRole('link', { name: '환불 규정' }).click();
  await expect(page).toHaveURL(/#refund$/);
});
