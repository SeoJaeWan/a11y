import { expect, test } from '@playwright/test';

test('예약을 우클릭해 취소한다', async ({ page }) => {
  await page.goto('/cases/run/right-click-menu-button-other-action');
  await page.getByRole('button', { name: '11월 20일 서울 호텔' }).click({ button: 'right' });
  await page.getByRole('menuitem', { name: '예약 취소' }).click();
  await expect(page.getByRole('status')).toHaveText('예약을 취소했습니다');
});
