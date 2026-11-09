import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('마감된 시간 뒤의 시간을 고른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/select-disabled-option');
  await page.getByLabel('시간').selectOption('12');
  await expect(page.getByRole('status')).toHaveText('12시 예약');
});
