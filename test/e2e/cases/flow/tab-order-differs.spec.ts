import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('예약자 정보를 입력한다', async ({ page }) => {
  await page.goto('/cases/flow/tab-order-differs');
  await page.getByLabel('이름').fill('김하늘');
  await page.getByLabel('연락처').fill('010-1234-5678');
  await page.getByRole('button', { name: '예약하기' }).click();
  await expect(page.getByRole('status')).toHaveText('김하늘님 예약을 접수했습니다');
});
