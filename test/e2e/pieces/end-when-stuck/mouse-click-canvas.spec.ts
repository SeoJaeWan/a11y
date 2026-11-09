import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('좌석 배치도에서 좌석을 고른다', async ({ page }) => {
  await page.goto('/pieces/end-when-stuck/mouse-click-canvas');
  await page.locator('canvas').waitFor();
  await page.mouse.click(50, 50);
  await expect(page.getByRole('status')).toHaveText('A1 좌석 선택');
});
