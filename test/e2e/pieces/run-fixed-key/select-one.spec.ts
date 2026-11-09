import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('인원을 고른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/select-one');
  await page.getByLabel('인원').selectOption('3');
  await expect(page.getByRole('status')).toHaveText('3명 예약');
});
