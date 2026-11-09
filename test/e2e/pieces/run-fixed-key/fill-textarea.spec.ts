import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('요청 사항을 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-textarea');
  await page.getByLabel('요청 사항').fill('문 앞에 놓아 주세요');
  await expect(page.getByLabel('요청 사항')).toHaveValue('문 앞에 놓아 주세요');
});
