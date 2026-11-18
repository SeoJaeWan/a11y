import { expect, test } from '@playwright/test';

test('프로필 사진을 올린다', async ({ page }) => {
  await page.goto('/cases/run/file-input-label-only');
  await page.getByLabel('올리기').setInputFiles({
    name: 'photo.png',
    mimeType: 'image/png',
    buffer: Buffer.from('photo'),
  });
  await expect(page.getByRole('status')).toHaveText('photo.png을 올렸습니다');
});
