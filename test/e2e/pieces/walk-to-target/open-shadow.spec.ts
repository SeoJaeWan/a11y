import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('쿠폰을 받는다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/open-shadow');
  await page.getByRole('button', { name: '쿠폰 받기' }).click();
  await expect(page.getByRole('status')).toHaveText('쿠폰을 받았습니다');
});
