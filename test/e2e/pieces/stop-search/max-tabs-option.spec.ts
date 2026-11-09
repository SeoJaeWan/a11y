import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 종료]]
test('회원 정보를 저장한다', async ({ page }) => {
  await page.goto('/pieces/stop-search/max-tabs-option');
  await page.getByText('저장', { exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
