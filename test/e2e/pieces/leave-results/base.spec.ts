import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:JSON 기록]]
test('저장 버튼을 누른다', async ({ page }) => {
  await page.goto('/pieces/leave-results/base');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
