import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('저장 버튼을 누른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/button-click');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
