import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('PDF로 내보낸다', async ({ page }) => {
  await page.goto('/pieces/guess-key/hover-submenu-item');
  await page.getByRole('button', { name: '파일' }).click();
  await page.getByRole('menuitem', { name: '내보내기' }).hover();
  await page.getByRole('menuitem', { name: 'PDF', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('PDF로 내보냈습니다');
});
