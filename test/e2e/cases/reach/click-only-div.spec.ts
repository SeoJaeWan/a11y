import { expect, test } from '@playwright/test';

test('쿠폰을 받는다', async ({ page }) => {
  await page.goto('/cases/reach/click-only-div');
  await page.getByText('쿠폰 받기').click();
  await expect(page.getByRole('status')).toHaveText('쿠폰을 받았습니다');
});
