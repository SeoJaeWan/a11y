import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('문서를 인쇄한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/menubar');
  await page.getByRole('menuitem', { name: '인쇄' }).click();
  await expect(page.getByRole('status')).toHaveText('인쇄 시작');
});
