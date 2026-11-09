import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('뉴스레터 받기를 끈다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/checked');
  await page.getByLabel('뉴스레터 받기').uncheck();
  await expect(page.getByLabel('뉴스레터 받기')).not.toBeChecked();
});
