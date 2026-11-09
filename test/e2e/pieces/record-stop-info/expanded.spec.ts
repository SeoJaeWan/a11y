import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('고급 설정을 연다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/expanded');
  await page.getByRole('button', { name: '고급 설정' }).click();
  await expect(page.getByText('방해 금지 시간을 정할 수 있습니다.')).toBeVisible();
});
