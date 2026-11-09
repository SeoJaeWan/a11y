import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 종료]]
test('상품을 더 불러온다', async ({ page }) => {
  await page.goto('/pieces/end-when-stuck/not-reached-limit');
  await page.getByText('더 보기').click();
  await expect(page.getByRole('status')).toHaveText('상품을 더 불러왔습니다');
});
