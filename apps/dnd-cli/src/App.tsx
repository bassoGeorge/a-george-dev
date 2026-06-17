/** biome-ignore-all lint/style/noNonNullAssertion: not important at the moment */
import { Box, Text, useApp } from 'ink'
import { useState } from 'react'
import { AbilitiesStep } from './steps/AbilitiesStep.js'
import type { CombatValues } from './steps/CombatStep.js'
import { CombatStep } from './steps/CombatStep.js'
import { FilenameStep } from './steps/FilenameStep.js'
import type { IdentityValues } from './steps/IdentityStep.js'
import { IdentityStep } from './steps/IdentityStep.js'
import type { ProficiencyValues } from './steps/ProficienciesStep.js'
import { ProficienciesStep } from './steps/ProficienciesStep.js'
import type { AbilityValues, WizardState } from './types.js'

type StepId = 'identity' | 'abilities' | 'combat' | 'proficiencies' | 'filename'

function toKebabCase(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function App({
  onComplete,
}: {
  onComplete: (state: WizardState) => void
}) {
  const { exit } = useApp()
  const [step, setStep] = useState<StepId>('identity')
  const [identity, setIdentity] = useState<IdentityValues | null>(null)
  const [abilities, setAbilities] = useState<AbilityValues | null>(null)
  const [combat, setCombat] = useState<CombatValues | null>(null)
  const [proficiencies, setProficiencies] = useState<ProficiencyValues | null>(
    null
  )

  function handleIdentity(values: IdentityValues) {
    setIdentity(values)
    setStep('abilities')
  }

  function handleAbilities(values: AbilityValues) {
    setAbilities(values)
    setStep('combat')
  }

  function handleCombat(values: CombatValues) {
    setCombat(values)
    setStep('proficiencies')
  }

  function handleProficiencies(values: ProficiencyValues) {
    setProficiencies(values)
    setStep('filename')
  }

  function handleFilename({ filename }: { filename: string }) {
    const state: WizardState = {
      name: identity!.name,
      characterClass: identity!.characterClass,
      subclass: identity!.subclass,
      level: identity!.level,
      species: identity!.species,
      background: identity!.background,
      experiencePoints: identity!.experiencePoints,
      abilities: abilities!,
      armorClass: combat!.armorClass,
      speed: combat!.speed,
      hitPointsMax: combat!.hitPointsMax,
      hitDiceType: combat!.hitDiceType,
      savingThrowProficiencies: proficiencies!.savingThrowProficiencies,
      skillProficiencies: proficiencies!.skillProficiencies,
      filename,
    }
    onComplete(state)
    exit()
  }

  const defaultFilename = identity
    ? `${toKebabCase(identity.name)}.data.ts`
    : 'character.data.ts'

  return (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text bold color="magenta">
          ⚔ Character Creator
        </Text>
      </Box>

      {step === 'identity' && <IdentityStep onComplete={handleIdentity} />}
      {step === 'abilities' && <AbilitiesStep onComplete={handleAbilities} />}
      {step === 'combat' && <CombatStep onComplete={handleCombat} />}
      {step === 'proficiencies' && (
        <ProficienciesStep onComplete={handleProficiencies} />
      )}
      {step === 'filename' && (
        <FilenameStep
          defaultFilename={defaultFilename}
          onComplete={handleFilename}
        />
      )}
    </Box>
  )
}
