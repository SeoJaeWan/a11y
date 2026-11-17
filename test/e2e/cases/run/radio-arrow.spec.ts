import { expect, test } from '@playwright/test';

test('새벽 배송을 고른다', async ({ page }) => {
  await page.goto('/cases/run/radio-arrow');
  await page.getByRole('radio', { name: '새벽 배송' }).check();
  await expect(page.getByRole('status')).toHaveText('새벽 배송으로 받습니다');
});
