import { expect, test } from '@playwright/test';

test('약관에 동의한다', async ({ page }) => {
  await page.goto('/cases/run/checkbox');
  await page.getByRole('checkbox', { name: '약관에 동의합니다' }).check();
  await expect(page.getByRole('button', { name: '가입하기' })).toBeEnabled();
});
