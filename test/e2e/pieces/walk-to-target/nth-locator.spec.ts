import { expect, test } from '@playwright/test';

// @codocs [[Playwright 가로채기:가로채기 방식]]
test('세 번째 담기를 누른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/nth-locator');
  await page.getByRole('button', { name: '담기' }).nth(2).click();
  await expect(page.getByRole('status')).toHaveText('장바구니: 포도');
});
