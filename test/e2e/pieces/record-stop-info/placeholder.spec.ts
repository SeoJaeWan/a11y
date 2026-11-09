import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('알림 받을 키워드를 입력한다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/placeholder');
  await page.getByPlaceholder('알림 받을 키워드').fill('할인');
  await expect(page.getByPlaceholder('알림 받을 키워드')).toHaveValue('할인');
});
