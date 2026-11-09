import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('문자 알림을 켠다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/nearest-heading');
  await page.getByRole('button', { name: '켜기' }).click();
  await expect(page.getByRole('status')).toHaveText('문자 알림을 켰습니다');
});
