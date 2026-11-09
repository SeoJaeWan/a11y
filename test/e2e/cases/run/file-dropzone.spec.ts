import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('업로드 영역으로 사진을 올린다', async ({ page }) => {
  await page.goto('/cases/run/file-dropzone');
  await page.locator('input[type="file"]').setInputFiles({
    name: 'photo.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from('photo'),
  });
  await expect(page.getByRole('status')).toHaveText('photo.jpg 올림');
});
