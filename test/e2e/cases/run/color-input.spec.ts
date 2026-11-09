import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('테마 색을 바꾼다', async ({ page }) => {
  await page.goto('/cases/run/color-input');
  await page.getByLabel('테마 색').fill('#ff0000');
  await expect(page.getByRole('status')).toHaveText('선택한 색: #ff0000');
});
