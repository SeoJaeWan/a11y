import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('기기 ID를 복사한다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/readonly');
  await page.getByRole('button', { name: '복사' }).click();
  await expect(page.getByRole('status')).toHaveText('복사했습니다');
});
