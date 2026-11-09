import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('두 버튼 중 하나로 사진을 올린다', async ({ page }) => {
  await page.goto('/pieces/guess-key/file-button-second');
  await page
    .locator('input[type="file"]')
    .setInputFiles({ name: 'me.png', mimeType: 'image/png', buffer: Buffer.from('png') });
  await expect(page.getByRole('status')).toHaveText('사진: me.png');
});
