import { expect, test } from '@playwright/test';

// a11y-alternative: 버튼으로 카드를 완료로 옮긴다
test('카드를 끌어 완료로 옮긴다', async ({ page }) => {
  await page.goto('/cases/run/drag-with-alternative');
  await page.getByText('보고서 쓰기').dragTo(page.getByRole('list', { name: '완료' }));
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('완료 1건을 저장했습니다');
});
