import { expect, test } from '@playwright/test';

test('예약 정보를 넣고 결제를 확인한다', async ({ page }) => {
  await page.goto('/cases/journey/booking-payment');
  await page.getByLabel('체크인').fill('2026-12-24');
  await page.getByLabel('인원').selectOption('2명');
  await page.getByLabel('카드 결제').check();
  await page.getByLabel('약관에 동의합니다').check();
  await page.getByRole('button', { name: '결제하기' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '확인' }).click();
  await expect(page.getByRole('heading', { name: '예약 완료' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('2026-12-24, 2명, 카드 결제');
});
