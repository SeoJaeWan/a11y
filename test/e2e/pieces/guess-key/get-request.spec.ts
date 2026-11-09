import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:재실행 전제]]
test('재고를 확인한다', async ({ page }) => {
  await page.goto('/pieces/guess-key/get-request');
  await page.route('**/api/stock', (route) => route.fulfill({ json: { count: 3 } }));
  await page.getByRole('button', { name: '재고 확인' }).click();
  await expect(page.getByRole('status')).toHaveText('재고 3개');
});
