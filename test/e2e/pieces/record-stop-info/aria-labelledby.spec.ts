import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('하루 최대 알림 수를 입력한다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/aria-labelledby');
  await page.getByRole('textbox', { name: '하루 최대 알림 수' }).fill('5');
  await expect(page.getByRole('textbox', { name: '하루 최대 알림 수' })).toHaveValue('5');
});
