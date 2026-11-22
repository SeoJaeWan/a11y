import { expect, test } from '@playwright/test';

test('소식 받기를 신청한다', async ({ page }) => {
  await page.goto('/cases/reach/button-in-shadow-dom');
  await page.getByRole('button', { name: '소식 받기' }).click();
  await expect(page.getByRole('status')).toHaveText('소식 받기를 신청했습니다');
});
