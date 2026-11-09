import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('검색어를 입력하고 Enter로 검색한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/on-target');
  await page.getByRole('searchbox', { name: '검색어' }).fill('우산');
  await page.getByRole('searchbox', { name: '검색어' }).press('Enter');
  await expect(page.getByRole('status')).toHaveText('우산 검색 결과');
});
