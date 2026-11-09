import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('결제 위젯에서 결제한다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/same-origin-iframe');
  const widget = page.frameLocator('iframe[title="결제 위젯"]');
  await widget.getByRole('button', { name: '결제하기' }).click();
  await expect(widget.getByRole('status')).toHaveText('결제를 요청했습니다');
});
