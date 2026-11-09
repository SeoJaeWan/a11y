import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('B2 좌석을 고른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/grid');
  await page.getByRole('gridcell', { name: 'B2' }).click();
  await expect(page.getByRole('status')).toHaveText('B2 좌석 선택');
});
