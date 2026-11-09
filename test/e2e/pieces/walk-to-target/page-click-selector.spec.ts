import { expect, test } from '@playwright/test';

// @codocs [[Playwright 가로채기:가로채기 방식]]
test('선택자로 담기를 누른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/page-click-selector');
  await page.click('button.add-to-cart');
  await expect(page.getByRole('status')).toHaveText('장바구니: 사과');
});
