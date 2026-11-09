import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('계정 메뉴를 펼친다', async ({ page }) => {
  await page.goto('/pieces/guess-key/hover-menu-button');
  await page.getByRole('button', { name: '계정' }).hover();
  await expect(page.getByRole('menu', { name: '계정' })).toBeVisible();
});
