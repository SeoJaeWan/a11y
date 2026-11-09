import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('좌표로 저장을 누른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/mouse-coordinates');
  await page.getByRole('button', { name: '저장' }).waitFor();
  await page.mouse.click(20, 20);
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
