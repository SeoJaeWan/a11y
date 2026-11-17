import { expect, test } from '@playwright/test';

test('예약을 확정한다', async ({ page }) => {
  await page.goto('/cases/reach/plain-button');
  await page.getByRole('button', { name: '예약 확정' }).click();
  await expect(page.getByRole('status')).toHaveText('예약이 확정되었습니다');
});
