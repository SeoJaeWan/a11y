import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('문의 탭을 연다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/tablist');
  await page.getByRole('tab', { name: '문의' }).click();
  await expect(page.getByRole('tabpanel')).toHaveText('상품 문의 3건');
});
