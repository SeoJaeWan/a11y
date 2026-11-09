import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('알림 설정을 저장한다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/base');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
