import { expect, test } from '@playwright/test';

// @codocs [[관찰과 판단의 분리:도달하지 못한 경우]]
test('주문을 결제한다', async ({ page }) => {
  await page.goto('/pieces/end-when-stuck/stuck-after-steps');
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('heading', { name: '결제' })).toBeVisible();
  await page.getByText('결제하기').click();
  await expect(page.getByRole('status')).toHaveText('결제했습니다');
});
