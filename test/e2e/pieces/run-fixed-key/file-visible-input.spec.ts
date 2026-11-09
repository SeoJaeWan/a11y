import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('프로필 사진을 올린다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/file-visible-input');
  await page
    .getByLabel('프로필 사진')
    .setInputFiles({ name: 'me.png', mimeType: 'image/png', buffer: Buffer.from('png') });
  await expect(page.getByRole('status')).toHaveText('사진: me.png');
});
