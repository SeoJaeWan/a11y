import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('받는 분을 입력하고 저장한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/after-previous-step');
  await page.getByLabel('받는 분').fill('김철수');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
