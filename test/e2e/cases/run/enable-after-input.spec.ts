import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('아이디를 넣고 가입한다', async ({ page }) => {
  await page.goto('/cases/run/enable-after-input');
  await page.getByLabel('아이디').fill('jaewan');
  await page.getByRole('button', { name: '가입하기' }).click();
  await expect(page.getByRole('status')).toHaveText('jaewan 님, 가입을 환영합니다');
});
