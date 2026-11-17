import { expect, test } from '@playwright/test';

test('객실을 장바구니에 담는다', async ({ page }) => {
  await page.goto('/cases/reach/text-in-button');
  await page.getByText('장바구니 담기').click();
  await expect(page.getByRole('status')).toHaveText('장바구니에 담았습니다');
});
