import { expect, test } from '@playwright/test';

// @codocs [[Playwright 가로채기:도입 방식]]
test('메모를 저장한다', async ({ page }) => {
  await page.goto('/pieces/toggle-a11y-run/base');
  await page.getByTestId('save-button').click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
