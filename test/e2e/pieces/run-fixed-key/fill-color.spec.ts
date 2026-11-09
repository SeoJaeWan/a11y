import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('테마 색을 고른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-color');
  await page.getByLabel('테마 색').fill('#ff0000');
  await expect(page.getByLabel('테마 색')).toHaveValue('#ff0000');
});
