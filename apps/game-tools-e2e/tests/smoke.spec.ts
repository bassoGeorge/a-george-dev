import { expect, test } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Game Tools' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Dungeons & Dragons' })
  ).toBeVisible();
});

test('character list page renders', async ({ page }) => {
  await page.goto('/dnd/characters');
  await expect(
    page.getByRole('heading', { name: 'D&D 5.5e Characters' })
  ).toBeVisible();
  await expect(page.locator('body')).not.toBeEmpty();

  for (const name of ['Claw', 'Elnorin Lunarrest', 'Gonvar Feathertide']) {
    await expect(page.getByText(name, { exact: true })).toBeVisible();
  }
});
