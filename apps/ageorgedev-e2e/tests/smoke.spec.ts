import { expect, test } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Anish' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'George' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Web Developer' })
  ).toBeVisible();
});

test('resume page renders', async ({ page }) => {
  await page.goto('/resume');
  await expect(page.locator('body')).not.toBeEmpty();
});

test('talks page renders', async ({ page }) => {
  await page.goto('/talks');
  await expect(page.locator('body')).not.toBeEmpty();
});
