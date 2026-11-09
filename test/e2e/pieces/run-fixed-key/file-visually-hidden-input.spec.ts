import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('숨긴 입력으로 사진을 올린다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/file-visually-hidden-input');
  await page
    .getByLabel('사진 올리기')
    .setInputFiles({ name: 'me.png', mimeType: 'image/png', buffer: Buffer.from('png') });
  await expect(page.getByRole('status')).toHaveText('사진: me.png');
});
