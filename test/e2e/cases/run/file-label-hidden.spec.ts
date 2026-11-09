import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('리뷰 사진을 올린다', async ({ page }) => {
  await page.goto('/cases/run/file-label-hidden');
  await page.getByLabel('사진 올리기').setInputFiles({
    name: 'dish.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from('dish'),
  });
  await expect(page.getByRole('status')).toHaveText('dish.jpg 올림');
});
