import { expect, test } from '@playwright/test';

test('home redirects into the app shell and shows the bottom nav', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Today' })).toBeVisible();
});
