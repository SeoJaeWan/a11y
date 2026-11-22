import { expect, test } from '@playwright/test';

test('결제 창에서 결제한다', async ({ page }) => {
  await page.goto('/cases/reach/button-in-iframe');
  await page.frameLocator('iframe').getByRole('button', { name: '결제하기' }).click();
  await expect(page.getByRole('status')).toHaveText('결제했습니다');
});
