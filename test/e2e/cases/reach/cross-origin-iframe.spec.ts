import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('결제 위젯으로 결제하고 주문 내역을 연다', async ({ page }) => {
  await page.goto('/cases/reach/cross-origin-iframe');
  const widget = page.frameLocator('iframe[title="결제 위젯"]');
  await widget.getByRole('button', { name: '결제하기' }).click();
  await expect(page.getByRole('status')).toHaveText('결제가 완료되었습니다');
  await page.getByRole('button', { name: '주문 내역 보기' }).click();
  await expect(page.getByRole('heading', { name: '주문 내역' })).toBeVisible();
});
