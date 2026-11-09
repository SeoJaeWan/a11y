import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('이메일을 입력한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/text-input');
  await page.getByLabel('이메일').fill('user@example.com');
  await expect(page.getByLabel('이메일')).toHaveValue('user@example.com');
});
