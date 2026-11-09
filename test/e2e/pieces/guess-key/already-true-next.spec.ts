import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:다음 단계 확인]]
test('주소를 삭제하고 오류가 없는지 본다', async ({ page }) => {
  await page.goto('/pieces/guess-key/already-true-next');
  await page.getByRole('button', { name: '주소 삭제' }).click();
  await expect(page.getByRole('alert')).toBeHidden();
});
