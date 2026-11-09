import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:도달 기준]]
test('상품 카드를 누른다', async ({ page }) => {
  await page.goto('/pieces/accept-reach/many-links-inside');
  await page.getByTestId('product-card').click();
  await expect(page.getByRole('status')).toHaveText('상품 상세를 열었습니다');
});
