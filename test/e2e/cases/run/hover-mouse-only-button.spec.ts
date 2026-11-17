import { expect, test } from '@playwright/test';

test('계정 메뉴에서 로그아웃한다', async ({ page }) => {
  await page.goto('/cases/run/hover-mouse-only-button');
  await page.getByRole('button', { name: '계정' }).hover();
  await page.getByRole('button', { name: '로그아웃' }).click();
  await expect(page.getByRole('status')).toHaveText('로그아웃했습니다');
});
