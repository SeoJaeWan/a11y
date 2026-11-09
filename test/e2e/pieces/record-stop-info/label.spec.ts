import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('알림 받을 이메일을 입력한다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/label');
  await page.getByLabel('알림 받을 이메일').fill('user@example.com');
  await expect(page.getByLabel('알림 받을 이메일')).toHaveValue('user@example.com');
});
