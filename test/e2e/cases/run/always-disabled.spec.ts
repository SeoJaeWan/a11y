import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('품절 상품은 장바구니에 담을 수 없다', async ({ page }) => {
  await page.goto('/cases/run/always-disabled');
  const addToCart = page.getByRole('button', { name: '장바구니 담기' });
  await expect(addToCart).toBeDisabled();
  await expect(addToCart.click({ timeout: 1000 })).rejects.toThrow('Timeout 1000ms exceeded');
});
