import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('이름을 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-text');
  await page.getByLabel('이름').fill('김민수');
  await expect(page.getByLabel('이름')).toHaveValue('김민수');
});
