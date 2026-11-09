import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('전체 메뉴를 연다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/nested-landmarks');
  await page.getByRole('button', { name: '전체 메뉴' }).click();
  await expect(page.getByRole('status')).toHaveText('전체 메뉴를 열었습니다');
});
