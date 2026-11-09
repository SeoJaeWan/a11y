import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('밑줄을 적용한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/toolbar');
  await page.getByRole('button', { name: '밑줄' }).click();
  await expect(page.getByRole('status')).toHaveText('밑줄 적용');
});
