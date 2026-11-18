import { expect, test } from '@playwright/test';

test('올리기 버튼으로 프로필 사진을 올린다', async ({ page }) => {
  await page.goto('/cases/run/file-chooser-button');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: '올리기' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: 'photo.png',
    mimeType: 'image/png',
    buffer: Buffer.from('photo'),
  });
  await expect(page.getByRole('status')).toHaveText('photo.png을 올렸습니다');
});
