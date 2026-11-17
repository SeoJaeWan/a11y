import { expect, test } from '@playwright/test';

test('빈자리 알림을 신청한다', async ({ page }) => {
  await page.goto('/cases/run/no-key-div-button');
  await page.getByRole('button', { name: '알림 받기' }).click();
  await expect(page.getByRole('status')).toHaveText('빈자리 알림을 신청했습니다');
});
