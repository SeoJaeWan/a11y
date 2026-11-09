import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('환불 규정 링크를 연다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/link');
  await page.getByRole('link', { name: '환불 규정 보기' }).click();
  await expect(page.getByRole('heading', { name: '환불 규정' })).toBeVisible();
});
