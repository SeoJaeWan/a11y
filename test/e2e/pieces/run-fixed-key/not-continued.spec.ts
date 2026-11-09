import { expect, test } from '@playwright/test';

// @codocs [[관찰과 판단의 분리:도달하지 못한 경우]]
test('정렬 메뉴를 연다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/not-continued');
  await page.getByRole('button', { name: '정렬' }).click();
  await expect(page.getByRole('list', { name: '정렬 기준' })).toBeVisible();
});
