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
