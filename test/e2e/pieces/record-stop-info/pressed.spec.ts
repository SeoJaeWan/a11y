import { expect, test } from '@playwright/test';

// @codocs [[기록과 리포트:단계 결과 값]]
test('알림을 끈다', async ({ page }) => {
  await page.goto('/pieces/record-stop-info/pressed');
  await page.getByRole('button', { name: '알림 끄기' }).click();
  await expect(page.getByRole('button', { name: '알림 끄기' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
