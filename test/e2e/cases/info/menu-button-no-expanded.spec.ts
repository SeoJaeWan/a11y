import { expect, test } from '@playwright/test';

// @codocs [[비시각 정보 모드:E2E 단계별 관찰]]
test('객실을 가격 낮은 순으로 정렬한다', async ({ page }) => {
  await page.goto('/cases/info/menu-button-no-expanded');
  await page.getByRole('button', { name: '정렬' }).click();
  await page.getByRole('button', { name: '가격 낮은 순' }).click();
  await expect(page.getByRole('status')).toHaveText('가격 낮은 순으로 정렬했습니다');
});
