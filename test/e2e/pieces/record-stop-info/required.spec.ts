import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('알림에 쓸 이름을 입력한다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/required');
  await page.getByLabel('알림에 쓸 이름').fill('재완');
  await expect(page.getByLabel('알림에 쓸 이름')).toHaveValue('재완');
});
