import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('저장한 예약의 이름을 바꾸기 시작한다', async ({ page }) => {
  await page.goto('/cases/run/declared-shortcut-broken');
  await page.getByRole('button', { name: '가족 모임' }).dblclick();
  await expect(page.getByRole('textbox', { name: '예약 이름' })).toHaveValue('가족 모임');
});
