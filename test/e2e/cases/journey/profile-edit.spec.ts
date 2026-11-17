import { expect, test } from '@playwright/test';

test('프로필의 이름과 소개를 고쳐 저장한다', async ({ page }) => {
  await page.goto('/cases/journey/profile-edit');
  await page.getByLabel('이름').fill('김철수');
  await page.getByLabel('소개').fill('안녕하세요');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('김철수, 안녕하세요: 저장되었습니다');
});
