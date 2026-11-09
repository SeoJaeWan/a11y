import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('다음을 누른 뒤 가입한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/focus-lost');
  await page.getByRole('button', { name: '다음' }).click();
  await page.getByRole('button', { name: '가입하기' }).click();
  await expect(page.getByRole('status')).toHaveText('가입했습니다');
});
