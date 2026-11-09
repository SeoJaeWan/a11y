import { expect, test } from '@playwright/test';

// @codocs [[관찰과 판단의 분리:도달하지 못한 경우]]
test('객실을 장바구니에 담는다', async ({ page }) => {
  await page.goto('/cases/reach/negative-tabindex-button');
  await page.getByRole('button', { name: '장바구니 담기' }).click();
  await expect(page.getByRole('status')).toHaveText('장바구니에 담았습니다');
});
