import { expect, test } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Game Tools' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Dungeons & Dragons' })
  ).toBeVisible();
});

test.skip('customisation dropdown is present on a character sheet', async ({
  page,
}) => {
  await page.goto('/dnd/characters/claw');
  // Wait for the sheet heading to confirm hydration before interacting with the dropdown
  await expect(page.getByRole('heading', { name: 'Claw' })).toBeVisible();
  const trigger = page.getByRole('button', { name: 'Customise' });
  await expect(trigger).toBeVisible();

  await trigger.click();
  await expect(
    page.getByRole('menuitemcheckbox', { name: 'Actions in Combat' })
  ).toBeVisible();
  await expect(
    page.getByRole('menuitemcheckbox', { name: 'Weapon Masteries' })
  ).toBeVisible();
  await expect(
    page.getByRole('menuitemcheckbox', { name: 'Notes' })
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
