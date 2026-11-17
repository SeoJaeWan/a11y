import { expect, test } from '@playwright/test';

test('메모를 저장한다', async ({ page }) => {
  await page.goto('/cases/toggle/a11y-off');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장했습니다');
});
