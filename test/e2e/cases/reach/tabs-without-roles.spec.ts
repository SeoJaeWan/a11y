import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('리뷰 탭을 연다', async ({ page }) => {
  await page.goto('/cases/reach/tabs-without-roles');
  await page.getByRole('button', { name: '리뷰' }).click();
  await expect(page.getByText('평점 4.8, 리뷰 120개')).toBeVisible();
});
