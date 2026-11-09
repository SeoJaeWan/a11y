import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:JSON 기록]]
test('쿠폰을 받는다', async ({ page }) => {
  await page.goto('/pieces/leave-results/unreached-step');
  await page.getByText('쿠폰 받기').click();
  await expect(page.getByRole('status')).toHaveText('쿠폰을 받았습니다');
});
