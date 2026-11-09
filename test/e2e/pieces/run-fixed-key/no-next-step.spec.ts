import { test } from '@playwright/test';

// @codocs [[키보드 모드:다음 단계 확인]]
test('로그아웃 버튼을 누른다', async ({ page }) => {
  await page.goto('/pieces/run-fixed-key/no-next-step');
  await page.getByRole('button', { name: '로그아웃' }).click();
});
