import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:도달 기준]]
test('저장 버튼을 누른다', async ({ page }) => {
  await page.goto('/pieces/accept-reach/same-element');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
