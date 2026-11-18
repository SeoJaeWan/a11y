import { expect, test } from '@playwright/test';

test('버튼으로 카드를 완료로 옮긴다', async ({ page }) => {
  await page.goto('/cases/run/drag-with-alternative');
  await page.getByRole('button', { name: '완료로 이동' }).click();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('완료 1건을 저장했습니다');
});
