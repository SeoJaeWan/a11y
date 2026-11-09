import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('쿠폰을 적용한다', async ({ page }) => {
  await page.goto('/cases/run/enter-button');
  await page.getByRole('button', { name: '쿠폰 적용' }).click();
  await expect(page.getByRole('status')).toHaveText('쿠폰이 적용되었습니다');
});
