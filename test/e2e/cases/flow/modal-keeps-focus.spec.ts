import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:관찰 항목]]
test('예약을 취소한다', async ({ page }) => {
  await page.goto('/cases/flow/modal-keeps-focus');
  await page.getByRole('button', { name: '예약 취소' }).click();
  await page.getByRole('button', { name: '취소 확정' }).click();
  await expect(page.getByRole('status')).toHaveText('예약이 취소되었습니다');
});
