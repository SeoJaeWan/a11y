import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('증빙 서류를 첨부한다', async ({ page }) => {
  await page.goto('/cases/run/file-visible-input');
  await page.getByLabel('증빙 서류').setInputFiles({
    name: 'claim.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4'),
  });
  await expect(page.getByRole('status')).toHaveText('claim.pdf 첨부됨');
});
