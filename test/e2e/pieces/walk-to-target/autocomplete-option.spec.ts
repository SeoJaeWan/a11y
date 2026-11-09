import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('제안 목록에서 서귀포를 고른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/autocomplete-option');
  await page.getByRole('combobox', { name: '도시' }).fill('서');
  await page.getByRole('option', { name: '서귀포' }).click();
  await expect(page.getByRole('combobox', { name: '도시' })).toHaveValue('서귀포');
});
