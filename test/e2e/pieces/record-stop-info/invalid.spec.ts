import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('휴대폰 번호를 고친다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/invalid');
  await page.getByLabel('휴대폰 번호').fill('010-1234-5678');
  await expect(page.getByLabel('휴대폰 번호')).toHaveAttribute('aria-invalid', 'false');
});
