import { expect, test } from '@playwright/test';

const CHARACTERS = [
  { slug: 'claw', name: 'Claw', hasSpellbook: true },
  { slug: 'elnorin-lunarrest', name: 'Elnorin Lunarrest', hasSpellbook: true },
  {
    slug: 'gonvar-feathertide',
    name: 'Gonvar Feathertide',
    hasSpellbook: false,
  },
] as const;

const SHEET_SECTION_HEADINGS = [
  'Class Features',
  'Passive Perception',
  'Proficiency Bonus',
  'Weapons & Damage Cantrips',
];

for (const character of CHARACTERS) {
  test(`${character.name} character sheet renders`, async ({ page }) => {
    await page.goto(`/dnd/characters/${character.slug}`);
    await expect(
      page.getByRole('heading', { name: character.name })
    ).toBeVisible();

    for (const heading of SHEET_SECTION_HEADINGS) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }

    await expect(
      page.getByRole('button', { name: 'Print character sheet' })
    ).toBeVisible();
  });

  test(`${character.name} spellbook link ${character.hasSpellbook ? 'is shown and resolves' : 'is absent'}`, async ({
    page,
  }) => {
    await page.goto(`/dnd/characters/${character.slug}`);
    const spellbookLink = page.getByRole('link', {
      name: 'Download spellbook PDF',
    });

    if (character.hasSpellbook) {
      await expect(spellbookLink).toBeVisible();
      const href = await spellbookLink.getAttribute('href');
      expect(href).toBeTruthy();
      const response = await page.request.get(href as string);
      expect(response.status()).toBe(200);
    } else {
      await expect(spellbookLink).toHaveCount(0);
    }
  });
}

test.describe('mobile character sheets', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('header and dense tables stay within the document viewport', async ({
    page,
  }) => {
    await page.goto('/dnd/characters/rusty');

    await expect(
      page.getByRole('button', { name: 'Print character sheet' })
    ).toBeHidden();
    await expect(
      page.getByRole('link', { name: 'Download Spellbook PDF' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Download Magic Item Plans PDF' })
    ).toBeVisible();

    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    expect(documentWidth).toBeLessThanOrEqual(390);

    for (const name of ['Weapons and damage cantrips table', 'Spell table']) {
      const tableRegion = page.getByRole('region', { name });
      await expect(tableRegion).toBeVisible();
      await expect(tableRegion).toHaveCSS('overflow-x', 'auto');
    }
  });

  test('grouped spells use mobile flow without document overflow', async ({
    page,
  }) => {
    await page.goto('/dnd/characters/talia-d-orien');
    await expect(page.getByRole('heading', { name: 'Spells' })).toBeVisible();

    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    expect(documentWidth).toBeLessThanOrEqual(390);
  });
});

test('desktop print keeps the two-page sheet and hides app chrome', async ({
  page,
}) => {
  await page.goto('/dnd/characters/rusty');
  await page.emulateMedia({ media: 'print' });

  await expect(page.getByRole('banner')).toBeHidden();

  const pages = page.locator('main > div');
  await expect(pages).toHaveCount(2);
  for (const innerPage of await pages.locator(':scope > div').all()) {
    await expect(innerPage).toHaveCSS('height', '720px');
    await expect(innerPage).toHaveCSS('overflow', 'hidden');
  }
});
