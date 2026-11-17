import { expect, test } from '@playwright/test';

test('별점과 내용, 사진을 넣어 후기를 등록한다', async ({ page }) => {
  const photo = { name: 'room.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('jpg') };
  await page.goto('/cases/journey/review-write');
  await page.getByRole('button', { name: '별점 5점' }).dblclick();
  await page.locator('.editor').fill('깨끗하고 좋았습니다');
  await page.getByLabel('사진 첨부').setInputFiles(photo);
  await page.getByRole('button', { name: '등록' }).click();
  await expect(page.getByRole('status')).toHaveText('별점 5점, room.jpg: 후기가 등록되었습니다');
});
