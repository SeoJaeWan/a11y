import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('약관에 동의한다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/check');
  await page.getByRole('checkbox', { name: '약관에 동의합니다' }).check();
  await expect(page.getByRole('button', { name: '가입하기' })).toBeEnabled();
});
