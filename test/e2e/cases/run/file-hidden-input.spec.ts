import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('영수증을 첨부한다', async ({ page }) => {
  await page.goto('/cases/run/file-hidden-input');
  await page.getByLabel('영수증 첨부').setInputFiles({
    name: 'receipt.png',
    mimeType: 'image/png',
    buffer: Buffer.from('receipt'),
  });
  await expect(page.getByRole('status')).toHaveText('receipt.png 첨부됨');
});
