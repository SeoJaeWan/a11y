import { expect, test } from '@playwright/test';

// @codocs [[Playwright 가로채기:도입 방식]]
test('data-qa 프로젝트에서 메모를 저장한다', async ({ page }) => {
  await page.goto('/pieces/toggle-a11y-run/testid-chromium-only');
  await page.getByTestId('save-button').click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
