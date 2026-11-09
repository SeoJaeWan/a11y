import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('높은 가격순으로 정렬한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/active-descendant');
  await page.getByRole('option', { name: '높은 가격순' }).click();
  await expect(page.getByRole('status')).toHaveText('높은 가격순으로 정렬');
});
