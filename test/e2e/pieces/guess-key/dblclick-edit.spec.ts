import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('장보기 항목을 더블클릭해 고친다', async ({ page }) => {
  await page.goto('/pieces/guess-key/dblclick-edit');
  await page.getByText('우유 사기').dblclick();
  await expect(page.getByRole('textbox', { name: '항목 이름' })).toBeVisible();
});
