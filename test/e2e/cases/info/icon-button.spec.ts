import { expect, test } from '@playwright/test';

// @codocs [[비시각 정보 모드:E2E 단계별 관찰]]
test('객실을 관심 목록에 담는다', async ({ page }) => {
  await page.goto('/cases/info/icon-button');
  await page.getByTestId('favorite-button').click();
  await expect(page.getByRole('status')).toHaveText('관심 객실에 담았습니다');
});
