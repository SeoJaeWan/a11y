import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:독립 실행]]
test('상품을 검색한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/press');
  const search = page.getByRole('searchbox', { name: '상품 검색' });
  await search.fill('이어폰');
  await search.press('Enter');
  await expect(page.getByRole('status')).toHaveText('"이어폰" 검색 결과');
});
