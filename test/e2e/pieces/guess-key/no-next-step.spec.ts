import { test } from '@playwright/test';

// @codocs [[키보드 모드:다음 단계 확인]]
test('알림을 끈다', async ({ page }) => {
  await page.goto('/pieces/guess-key/no-next-step');
  await page.getByRole('button', { name: '알림 끄기' }).click();
});
