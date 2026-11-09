import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('비즈니스석을 고른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/listbox');
  await page.getByRole('option', { name: '비즈니스' }).click();
  await expect(page.getByRole('status')).toHaveText('비즈니스 선택됨');
});
