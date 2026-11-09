import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('도착 도시를 제안에서 고른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/autocomplete-option');
  await page.getByRole('combobox', { name: '도착 도시' }).fill('부');
  await page.getByRole('option', { name: '부천' }).click();
  await expect(page.getByRole('combobox', { name: '도착 도시' })).toHaveValue('부천');
});
