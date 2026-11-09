import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:JSON 기록]]
test('주문한다', async ({ page }) => {
  await page.goto('/pieces/leave-results/waits-and-getters');
  await page.getByRole('button', { name: '주문하기' }).waitFor();
  const total = await page.getByTestId('total').textContent();
  await page.getByRole('button', { name: '주문하기' }).click();
  await expect(page.getByRole('status')).toHaveText(`${total ?? ''} 결제를 요청했습니다`);
});
