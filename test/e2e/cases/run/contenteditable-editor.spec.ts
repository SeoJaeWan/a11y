import { expect, test } from '@playwright/test';

// @codocs [[키보드 모드:동작]]
test('후기를 고쳐 저장한다', async ({ page }) => {
  await page.goto('/cases/run/contenteditable-editor');
  await page.getByRole('textbox', { name: '후기' }).fill('친절하고 맛있었어요');
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByRole('status')).toHaveText('저장한 후기: 친절하고 맛있었어요');
});
