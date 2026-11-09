import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:재실행 전제]]
test('장바구니에 담는다', async ({ page }) => {
  await page.goto('/pieces/guess-key/post-request');
  await page.route('**/api/cart', (route) => route.fulfill({ status: 201, json: { ok: true } }));
  await page.getByRole('button', { name: '장바구니 담기' }).click();
  await expect(page.getByRole('status')).toHaveText('장바구니에 담았습니다');
});
