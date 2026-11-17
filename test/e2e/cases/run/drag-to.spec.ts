import { expect, test } from '@playwright/test';

test('할 일을 완료로 옮기고 저장한다', async ({ page }) => {
  await page.goto('/cases/run/drag-to');
  await page.getByText('보고서 쓰기').dragTo(page.getByRole('list', { name: '완료' }));
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('완료 1건을 저장했습니다');
});
