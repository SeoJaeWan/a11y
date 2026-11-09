import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('리뷰 탭을 연다', async ({ page }) => {
  await page.goto('/cases/reach/standard-tabs');
  await page.getByRole('tab', { name: '리뷰' }).click();
  await expect(page.getByRole('tabpanel', { name: '리뷰' })).toHaveText('평점 4.8, 리뷰 120개');
});
