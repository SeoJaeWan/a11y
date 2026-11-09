import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('예약 상세로 가서 변경을 시작한다', async ({ page }) => {
  await page.goto('/cases/flow/spa-heading-focus');
  await page.getByRole('link', { name: '3월 12일 예약' }).click();
  await page.getByRole('button', { name: '예약 변경' }).click();
  await expect(page.getByRole('status')).toHaveText('변경할 날짜를 고르세요');
});
