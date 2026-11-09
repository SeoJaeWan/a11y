import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('미리보기를 연 뒤 저장한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/after-target');
  await page.getByRole('button', { name: '미리보기' }).click();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
