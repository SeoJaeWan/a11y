import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('음악 폴더를 연다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/tree');
  await page.getByRole('treeitem', { name: '음악' }).click();
  await expect(page.getByRole('status')).toHaveText('음악 폴더 열림');
});
