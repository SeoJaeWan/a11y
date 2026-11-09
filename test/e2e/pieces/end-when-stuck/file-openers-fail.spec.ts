import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('끌어 놓는 영역에 파일을 올린다', async ({ page }) => {
  await page.goto('/pieces/end-when-stuck/file-openers-fail');
  await page
    .locator('input[type="file"]')
    .setInputFiles({ name: 'plan.pdf', mimeType: 'application/pdf', buffer: Buffer.from('pdf') });
  await expect(page.getByRole('status')).toHaveText('첨부: plan.pdf');
});
