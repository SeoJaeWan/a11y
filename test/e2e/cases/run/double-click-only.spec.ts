import { expect, test } from '@playwright/test';

test('예약을 더블클릭해 상세를 연다', async ({ page }) => {
  await page.goto('/cases/run/double-click-only');
  await page.getByText('11월 20일 서울 호텔').dblclick();
  await expect(page.getByRole('status')).toHaveText('예약 상세를 열었습니다');
});
