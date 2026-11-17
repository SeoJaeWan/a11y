import { expect, test } from '@playwright/test';

test('객실 등급을 고른다', async ({ page }) => {
  await page.goto('/cases/reach/listbox-focus');
  await page.getByRole('button', { name: '객실 등급' }).click();
  await page.getByRole('option', { name: '스위트' }).click();
  await expect(page.getByRole('status')).toHaveText('스위트 객실을 골랐습니다');
});
