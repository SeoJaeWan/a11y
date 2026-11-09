import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('주소 변경 창에서 새 주소를 저장한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/moved-by-app');
  await page.getByRole('button', { name: '주소 변경' }).click();
  await page.getByLabel('새 주소').fill('서울시 중구');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('주소를 바꿨습니다');
});
