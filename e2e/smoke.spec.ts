import { expect, test } from '@playwright/test';

test('core flow: sign up, complete profile, activate routine', async ({ page }) => {
  const email = `test-${Date.now()}@example.com`;
  const password = 'password123';

  await page.goto('/login');
  await page.getByRole('button', { name: "Don't have an account? Create one" }).click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page).toHaveURL(/\/today$/);
  await expect(page.getByRole('link', { name: 'Today' })).toBeVisible();

  await page.getByRole('link', { name: 'Complete your profile' }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await page.getByLabel('Goal').fill('Reduce frizz and improve curl definition');
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('/profile') && res.request().method() === 'POST',
    ),
    page.getByRole('button', { name: 'Save profile' }).click(),
  ]);

  await page.reload();
  await expect(page.getByLabel('Goal')).toHaveValue('Reduce frizz and improve curl definition');

  await page.getByRole('link', { name: 'Routines' }).click();
  await expect(page).toHaveURL(/\/routines$/);
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('/routines') && res.request().method() === 'POST',
    ),
    page.getByRole('button', { name: 'Activate this routine' }).click(),
  ]);
  await expect(page.getByText('Weekly Wash & Go')).toBeVisible();
  await expect(page.getByText('1. detangle')).toBeVisible();

  await page.getByRole('link', { name: 'Today' }).click();
  await expect(page).toHaveURL(/\/today$/);
  await expect(page.getByText('Weekly Wash & Go')).toBeVisible();

  await page.getByRole('link', { name: 'Recs' }).click();
  await expect(page).toHaveURL(/\/recommendations$/);
  await expect(page.getByText('Consider replacing your define product')).toBeVisible();

  // The real FR-grounded catalog also flags the leave-in step, so scope to the define card.
  const defineCard = page
    .locator('li')
    .filter({ hasText: 'Consider replacing your define product' });
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('/recommendations') && res.request().method() === 'POST',
    ),
    defineCard.getByRole('button', { name: 'Keep it anyway' }).click(),
  ]);
  await expect(page.getByText('Consider replacing your define product')).not.toBeVisible();
  await expect(page.getByText(/Kept/)).toBeVisible();

  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('/recommendations') && res.request().method() === 'POST',
    ),
    page.getByRole('button', { name: 'Undo' }).click(),
  ]);
  await expect(page.getByText('Consider replacing your define product')).toBeVisible();
});
