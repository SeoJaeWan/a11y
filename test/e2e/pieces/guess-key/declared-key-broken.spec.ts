import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:실행 키 선택]]
test('앨범 이름을 바꾼다', async ({ page }) => {
  await page.goto('/pieces/guess-key/declared-key-broken');
  await page.getByText('여행 사진').dblclick();
  await expect(page.getByRole('textbox', { name: '새 이름' })).toBeVisible();
});
