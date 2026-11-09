import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:독립 실행]]
test('쿠폰을 받아 적용한다', async ({ page }) => {
  await page.goto('/pieces/guess-key/two-guessed-steps');
  await page.getByRole('button', { name: '쿠폰 받기' }).click();
  await expect(page.getByRole('status')).toHaveText('쿠폰을 받았습니다');
  await page.getByRole('button', { name: '쿠폰 적용' }).click();
  await expect(page.getByRole('status')).toHaveText('쿠폰을 적용했습니다');
});
