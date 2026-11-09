import { expect, test } from '@playwright/test';

// @codocs [[관찰과 판단의 분리:도달하지 못한 경우]]
test('빈자리 알림을 신청한다', async ({ page }) => {
  await page.goto('/cases/run/no-key-div-button');
  await page.getByRole('button', { name: '알림 받기' }).click();
  await expect(page.getByRole('status')).toHaveText('빈자리 알림을 신청했습니다');
});
