import { expect, test } from '@playwright/test';

test('예약 인원을 고른다', async ({ page }) => {
  await page.goto('/cases/run/select-option');
  await page.getByLabel('인원').selectOption('3명');
  await expect(page.getByRole('status')).toHaveText('3명 · 90,000원');
});
