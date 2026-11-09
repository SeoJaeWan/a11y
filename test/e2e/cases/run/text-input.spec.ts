import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('예약자 이름을 입력한다', async ({ page }) => {
  await page.goto('/cases/run/text-input');
  await page.getByRole('textbox', { name: '예약자 이름' }).fill('홍길동');
  await expect(page.getByRole('status')).toHaveText('홍길동 님으로 예약합니다');
});
