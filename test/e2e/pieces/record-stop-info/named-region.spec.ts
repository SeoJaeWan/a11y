import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('방해 금지를 켠다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/named-region');
  await page.getByRole('button', { name: '켜기' }).click();
  await expect(page.getByRole('status')).toHaveText('방해 금지를 켰습니다');
});
