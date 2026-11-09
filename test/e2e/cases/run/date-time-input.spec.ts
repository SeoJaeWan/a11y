import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('방문 일시를 고른다', async ({ page }) => {
  await page.goto('/cases/run/date-time-input');
  await page.getByLabel('방문 일시').fill('2026-03-12T14:30');
  await expect(page.getByRole('status')).toHaveText('3월 12일 14:30 방문 예정');
});
