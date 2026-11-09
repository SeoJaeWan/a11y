import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('알림 목록을 새로 고친다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/title');
  await page.getByTitle('새로 고침').click();
  await expect(page.getByRole('status')).toHaveText('새로 고쳤습니다');
});
