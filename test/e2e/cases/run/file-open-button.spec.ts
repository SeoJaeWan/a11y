import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('프로필 사진을 바꾼다', async ({ page }) => {
  await page.goto('/cases/run/file-open-button');
  await page.locator('input[type="file"]').setInputFiles({
    name: 'me.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from('me'),
  });
  await expect(page.getByRole('status')).toHaveText('현재 사진: me.jpg');
});
