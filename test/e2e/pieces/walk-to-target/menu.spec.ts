import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('파일을 삭제한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/menu');
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByRole('status')).toHaveText('삭제 완료');
});
