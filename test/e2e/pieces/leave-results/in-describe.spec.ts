import { expect, test } from '@playwright/test';

test.describe('장바구니', () => {
  // @codocs [[기록과 리포트:JSON 기록]]
  test('수량을 늘린다', async ({ page }) => {
    await page.goto('/pieces/leave-results/in-describe');
    await page.getByRole('button', { name: '수량 늘리기' }).click();
    await expect(page.getByRole('status')).toHaveText('수량 2');
  });
});
