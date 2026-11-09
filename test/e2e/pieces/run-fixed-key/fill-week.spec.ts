import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('배송 주를 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-week');
  await page.getByLabel('배송 주').fill('2026-W52');
  await expect(page.getByLabel('배송 주')).toHaveValue('2026-W52');
});
