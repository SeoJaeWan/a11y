import { expect, test } from '@playwright/test';

test('관리 화면에서 예약을 취소한다', async ({ page }) => {
  await page.goto('/cases/journey/admin-bookings');
  await page.getByRole('row', { name: '홍길동' }).getByRole('button', { name: '더보기' }).click();
  await page.getByRole('menuitem', { name: '예약 취소' }).click();
  await page.getByRole('button', { name: '취소 확정' }).click();
  await expect(page.getByRole('row', { name: '홍길동' })).toContainText('취소됨');
});
