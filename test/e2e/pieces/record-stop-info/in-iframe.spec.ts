import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('미리보기 알림을 보낸다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/in-iframe');
  const preview = page.frameLocator('iframe[title="알림 미리보기"]');
  await preview.getByRole('button', { name: '미리보기 보내기' }).click();
  await expect(preview.getByRole('status')).toHaveText('미리보기를 보냈습니다');
});
