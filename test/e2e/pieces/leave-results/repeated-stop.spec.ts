import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:JSON 기록]]
test('저장한 뒤 검색을 연다', async ({ page }) => {
  await page.goto('/pieces/leave-results/repeated-stop');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
  await page.getByTestId('search-button').click();
  await expect(page.getByRole('searchbox', { name: '검색어' })).toBeVisible();
});
