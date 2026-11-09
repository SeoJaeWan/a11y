import { expect, test } from '@playwright/test';

// @codocs [[Playwright 가로채기:가로채기 방식]]
test('바나나 항목의 담기를 누른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/filter-locator');
  await page
    .getByRole('listitem')
    .filter({ hasText: '바나나' })
    .getByRole('button', { name: '담기' })
    .click();
  await expect(page.getByRole('status')).toHaveText('장바구니: 바나나');
});
