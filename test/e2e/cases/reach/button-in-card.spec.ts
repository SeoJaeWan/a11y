import { expect, test } from '@playwright/test';

test('검색 결과에서 호텔을 찜한다', async ({ page }) => {
  await page.goto('/cases/reach/button-in-card');
  await page.getByRole('button', { name: '찜하기' }).click();
  await expect(page.getByRole('status')).toHaveText('바다 호텔을 찜했습니다');
});
