import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 종료]]
test('쿠폰을 받고 예약을 확정한다', async ({ page }) => {
  await page.goto('/cases/reach/modal-trap');
  await page.getByRole('button', { name: '쿠폰 받기' }).click();
  await expect(page.getByRole('dialog', { name: '쿠폰이 발급되었습니다' })).toBeVisible();
  await page.getByRole('button', { name: '예약 확정' }).click();
  await expect(page.getByRole('status')).toHaveText('예약이 확정되었습니다');
});
