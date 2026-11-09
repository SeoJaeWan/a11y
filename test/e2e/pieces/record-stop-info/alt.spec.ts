import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('테스트 알림을 보낸다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/alt');
  await page.getByAltText('알림 테스트 보내기').click();
  await expect(page.getByRole('status')).toHaveText('테스트 알림을 보냈습니다');
});
