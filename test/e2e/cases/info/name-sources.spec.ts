import { expect, test } from '@playwright/test';

// @codocs [[비시각 정보 모드:E2E 단계별 관찰]]
test('예약 번호로 예약을 찾는다', async ({ page }) => {
  await page.goto('/cases/info/name-sources');
  await page.getByLabel('예약 번호').fill('A1234');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('status')).toHaveText('A1234 예약 1건');
});
