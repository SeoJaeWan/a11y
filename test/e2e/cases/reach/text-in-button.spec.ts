import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:도달 기준]]
test('객실을 장바구니에 담는다', async ({ page }) => {
  await page.goto('/cases/reach/text-in-button');
  await page.getByText('장바구니 담기').click();
  await expect(page.getByRole('status')).toHaveText('장바구니에 담았습니다');
});
