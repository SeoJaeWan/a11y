import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('할 일을 완료로 옮긴다', async ({ page }) => {
  await page.goto('/pieces/end-when-stuck/drag-to');
  await page.getByText('보고서 쓰기').dragTo(page.getByRole('list', { name: '완료' }));
  await expect(page.getByRole('list', { name: '완료' })).toContainText('보고서 쓰기');
});
