import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('영국 영어 페이지에서 체크인 날짜를 입력한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/fill-date-page-language');
  await page.getByLabel('Check-in').fill('2026-12-24');
  await expect(page.getByLabel('Check-in')).toHaveValue('2026-12-24');
});
