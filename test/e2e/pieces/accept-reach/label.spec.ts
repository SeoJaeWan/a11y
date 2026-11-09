import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:도달 기준]]
test('약관 동의 글자를 누른다', async ({ page }) => {
  await page.goto('/pieces/accept-reach/label');
  await page.getByText('약관에 동의합니다').click();
  await expect(page.getByRole('checkbox')).toBeChecked();
});
