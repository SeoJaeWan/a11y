import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('알림 배너를 닫는다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/aria-label');
  await page.getByRole('button', { name: '닫기' }).click();
  await expect(page.getByText('앱 알림을 켜면 할인 소식을 받을 수 있습니다.')).toBeHidden();
});
