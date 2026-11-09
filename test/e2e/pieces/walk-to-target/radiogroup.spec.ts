import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('새벽 배송을 고른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/radiogroup');
  await page.getByRole('radio', { name: '새벽 배송' }).check();
  await expect(page.getByRole('radio', { name: '새벽 배송' })).toBeChecked();
});
