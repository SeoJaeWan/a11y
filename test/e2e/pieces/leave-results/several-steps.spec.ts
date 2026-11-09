import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:JSON 기록]]
test('회원으로 가입한다', async ({ page }) => {
  await page.goto('/pieces/leave-results/several-steps');
  await page.getByLabel('이름').fill('김민수');
  await page.getByRole('checkbox', { name: '약관에 동의합니다' }).check();
  await page.getByRole('button', { name: '가입하기' }).click();
  await expect(page.getByRole('status')).toHaveText('김민수님 환영합니다');
});
