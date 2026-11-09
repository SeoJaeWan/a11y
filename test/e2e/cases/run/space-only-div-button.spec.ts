import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:독립 실행]]
test('창가 좌석을 선택한다', async ({ page }) => {
  await page.goto('/cases/run/space-only-div-button');
  await page.getByRole('button', { name: '창가 좌석 선택' }).click();
  await expect(page.getByRole('status')).toHaveText('창가 좌석을 선택했습니다');
});
