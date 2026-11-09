import { expect, test } from '@playwright/test';

// @codocs [[관찰과 판단의 분리:도달하지 못한 경우]]
test('구독한다', async ({ page }) => {
  await page.goto('/pieces/end-when-stuck/keys-exhausted');
  await page.getByRole('button', { name: '구독하기' }).click();
  await expect(page.getByRole('status')).toHaveText('구독했습니다');
});
