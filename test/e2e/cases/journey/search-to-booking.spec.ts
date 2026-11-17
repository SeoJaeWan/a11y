import { expect, test } from '@playwright/test';

test('여행지를 검색해 호텔 예약을 시작한다', async ({ page }) => {
  await page.goto('/cases/journey/search');
  await page.getByPlaceholder('여행지 검색').fill('제주');
  await page.getByRole('option', { name: '제주 서귀포' }).click();
  await page.getByRole('link', { name: '바다 호텔' }).click();
  await page.getByRole('button', { name: '예약하기' }).click();
  await expect(page).toHaveURL(/journey\/booking-start/);
});
