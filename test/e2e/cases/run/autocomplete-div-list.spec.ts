import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:탐색 경로]]
test('도착 도시를 제안 목록에서 고른다', async ({ page }) => {
  await page.goto('/cases/run/autocomplete-div-list');
  await page.getByLabel('도착 도시').fill('서');
  await page.getByText('서산').click();
  await expect(page.getByRole('status')).toHaveText('도착 도시: 서산');
});
