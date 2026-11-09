import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('요청 사항을 고치기 시작한다', async ({ page }) => {
  await page.goto('/cases/run/dblclick-edit');
  await page.getByRole('button', { name: '창가 자리 부탁드립니다' }).dblclick();
  await expect(page.getByRole('textbox', { name: '요청 사항' })).toHaveValue(
    '창가 자리 부탁드립니다',
  );
});
