import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:도달 기준]]
test('검색 칸을 누른다', async ({ page }) => {
  await page.goto('/pieces/accept-reach/one-input-inside');
  await page.getByTestId('search-field').click();
  await expect(page.getByRole('textbox', { name: '검색어' })).toBeFocused();
});
