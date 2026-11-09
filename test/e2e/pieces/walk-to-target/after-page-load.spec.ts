import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('다음 글로 이동해 좋아요를 누른다', async ({ page }) => {
  await page.goto('/pieces/walk-to-target/after-page-load');
  await page.getByRole('link', { name: '다음 글' }).click();
  await page.getByRole('button', { name: '좋아요' }).click();
  await expect(page.getByRole('status')).toHaveText('좋아요를 눌렀습니다');
});
