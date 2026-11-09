import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('좌석 배치도에서 좌석을 고른다', async ({ page }) => {
  await page.goto('/cases/run/mouse-click-canvas');
  await page.getByRole('img', { name: '좌석 배치도' }).waitFor();
  await page.mouse.click(100, 220);
  await expect(page.getByRole('status')).toHaveText('선택한 좌석: A2');
});
