import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('끌어 놓는 영역으로 파일을 올린다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/file-dropzone');
  await page
    .locator('input[type="file"]')
    .setInputFiles({ name: 'plan.pdf', mimeType: 'application/pdf', buffer: Buffer.from('pdf') });
  await expect(page.getByRole('status')).toHaveText('첨부: plan.pdf');
});
