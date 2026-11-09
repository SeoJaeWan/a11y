import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('도형 도구를 고른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/vertical-toolbar');
  await page.getByRole('button', { name: '도형' }).click();
  await expect(page.getByRole('status')).toHaveText('도형 선택');
});
