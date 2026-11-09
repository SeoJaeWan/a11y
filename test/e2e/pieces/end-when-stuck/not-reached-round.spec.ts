import { expect, test } from '@playwright/test';

// @codocs [[관찰과 판단의 분리:도달하지 못한 경우]]
test('쿠폰을 받는다', async ({ page }) => {
  await page.goto('/pieces/end-when-stuck/not-reached-round');
  await page.getByText('쿠폰 받기').click();
  await expect(page.getByRole('status')).toHaveText('쿠폰을 받았습니다');
});
