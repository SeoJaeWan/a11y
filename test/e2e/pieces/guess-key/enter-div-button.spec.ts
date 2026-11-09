import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:독립 실행]]
test('쿠폰을 받는다', async ({ page }) => {
  await page.goto('/pieces/guess-key/enter-div-button');
  await page.getByRole('button', { name: '쿠폰 받기' }).click();
  await expect(page.getByRole('status')).toHaveText('쿠폰을 받았습니다');
});
