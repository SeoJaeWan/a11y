import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:JSON 기록]]
test('사진을 저장한다', async ({ page }) => {
  await page.goto('/pieces/leave-results/unnamed-stops');
  await page.getByRole('button', { name: '사진 저장' }).click();
  await expect(page.getByRole('status')).toHaveText('사진을 저장했습니다');
});
