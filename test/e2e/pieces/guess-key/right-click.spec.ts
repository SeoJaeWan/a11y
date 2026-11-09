import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('파일 메뉴를 우클릭으로 연다', async ({ page }) => {
  await page.goto('/pieces/guess-key/right-click');
  await page.getByText('보고서.pdf').click({ button: 'right' });
  await expect(page.getByRole('menu', { name: '파일 메뉴' })).toBeVisible();
});
