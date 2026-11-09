import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('관심 분야를 여러 개 고른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/select-multiple');
  await page.getByLabel('관심 분야').selectOption(['음식', '음악']);
  await expect(page.getByRole('status')).toHaveText('음식, 음악');
});
