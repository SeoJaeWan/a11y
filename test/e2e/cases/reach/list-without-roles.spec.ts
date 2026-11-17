import { expect, test } from '@playwright/test';

test('높은 가격순으로 정렬한다', async ({ page }) => {
  await page.goto('/cases/reach/list-without-roles');
  await page.getByRole('button', { name: '정렬' }).click();
  await page.getByText('높은 가격순').click();
  await expect(page.getByRole('status')).toHaveText('높은 가격순으로 정렬했습니다');
});
