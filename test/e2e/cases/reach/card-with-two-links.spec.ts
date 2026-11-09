import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:도달 기준]]
test('검색 결과 카드를 연다', async ({ page }) => {
  await page.goto('/cases/reach/card-with-two-links');
  await page.getByRole('article').filter({ hasText: '바다 호텔' }).click();
  await expect(page.getByRole('status')).toHaveText('바다 호텔 상세를 열었습니다');
});
