import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 종료]]
test('쿠키 창이 떠 있는 채로 검색한다', async ({ page }) => {
  await page.goto('/pieces/stop-search/modal-trap');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('status')).toHaveText('검색 결과 12건');
});
