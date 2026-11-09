import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('모든 알림 채널을 고른다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/mixed');
  await page.getByLabel('전체 선택').check();
  await expect(page.getByLabel('문자')).toBeChecked();
});
