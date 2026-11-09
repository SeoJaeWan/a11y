import { expect, test } from '@playwright/test';

// @codocs [[비시각 정보 모드:E2E 단계별 관찰]]
test('예약에 쿠폰을 적용한다', async ({ page }) => {
  await page.goto('/cases/info/landmarks-headings');
  await page.getByLabel('쿠폰 번호').fill('SPRING10');
  await page.getByRole('button', { name: '쿠폰 적용' }).click();
  await expect(page.getByRole('status')).toHaveText('SPRING10 쿠폰을 적용했습니다');
});
