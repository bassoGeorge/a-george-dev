import { expect, test } from '@playwright/test';

test('talks page lists the Tailwind talk', async ({ page }) => {
  await page.goto('/talks');
  await expect(
    page.getByRole('heading', { name: 'Tailwind beyond Production' })
  ).toBeVisible();
});

test('Tailwind talk links to its detail page', async ({ page }) => {
  await page.goto('/talks');
  const link = page.getByRole('link', { name: /Tailwind beyond Production/i });
  await expect(link).toHaveAttribute('href', '/talks/tailwind');
  await link.click();
  await expect(page).toHaveURL(/\/talks\/tailwind\/?$/);
});
