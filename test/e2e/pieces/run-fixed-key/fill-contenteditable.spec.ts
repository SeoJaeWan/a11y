import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('메모를 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-contenteditable');
  await page.getByRole('textbox', { name: '메모' }).fill('창가 자리 부탁드립니다');
  await expect(page.getByRole('textbox', { name: '메모' })).toHaveText('창가 자리 부탁드립니다');
});
