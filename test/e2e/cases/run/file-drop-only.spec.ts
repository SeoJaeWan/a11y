import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('첨부 파일을 올린다', async ({ page }) => {
  await page.goto('/cases/run/file-drop-only');
  await page.locator('input[type="file"]').setInputFiles({
    name: 'contract.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4'),
  });
  await expect(page.getByRole('status')).toHaveText('contract.pdf 올림');
});
