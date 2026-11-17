import { expect, test as setup } from '@playwright/test';

setup('로그인해서 상태를 저장한다', async ({ page }) => {
  await page.goto('/cases/journey/login');
  await page.getByLabel('이메일').fill('staff@example.com');
  await page.getByLabel('비밀번호').fill('pw1234');
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page.getByRole('status')).toHaveText('로그인했습니다');
  await page.context().storageState({ path: `${setup.info().config.rootDir}/../.auth/user.json` });
});
