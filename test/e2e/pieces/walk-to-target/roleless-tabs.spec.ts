import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('문의 탭을 연다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/roleless-tabs');
  await page.getByText('문의', { exact: true }).click();
  await expect(page.getByText('상품 문의 3건')).toBeVisible();
});
