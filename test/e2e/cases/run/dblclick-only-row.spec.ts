import { expect, test } from '@playwright/test';

// @codocs [[관찰과 판단의 분리:도달하지 못한 경우]]
test('예약 상세를 연다', async ({ page }) => {
  await page.goto('/cases/run/dblclick-only-row');
  await page.getByRole('row', { name: '3월 12일 오후 2시 2명' }).dblclick();
  await expect(page.getByRole('heading', { name: '예약 상세' })).toBeVisible();
});
