import { expect, test } from '@playwright/test';

// @codocs [[Playwright 가로채기:도입 방식]]
test('예약을 확정한다', async ({ page }) => {
  await page.goto('/cases/reach/data-qa-test-id');
  await page.getByTestId('confirm-booking').click();
  await expect(page.getByRole('status')).toHaveText('예약이 확정되었습니다');
});
