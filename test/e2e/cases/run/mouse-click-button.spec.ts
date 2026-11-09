import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('지도에서 매장 핀을 눌러 주소를 본다', async ({ page }) => {
  await page.goto('/cases/run/mouse-click-button');
  await page.getByRole('button', { name: '강남점' }).waitFor();
  await page.mouse.click(300, 260);
  await expect(page.getByRole('status')).toHaveText('강남점: 서울 강남구 테헤란로 1');
});
