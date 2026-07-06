import { GameInfoPanel, GameInfoPanelTitle } from '../layout/GameInfoPanel';

export function ActionsInCombat() {
  return (
    <GameInfoPanel>
      <GameInfoPanelTitle>Actions in Combat</GameInfoPanelTitle>

      <div className="columns-3 gap-2 text-xs">
        <div>
          <strong>Weapon Attack. </strong>
          <span>Equip or un-equip a weapon, then make an Attack roll.</span>
        </div>
        <div>
          <strong>Unarmed Strike.</strong>
          <span>
            <em>to hit: </em>Attack roll + Str. + Proficiency Bonus.{' '}
            <em>on hit:</em> 1 + Str. Bludgeoning damage.
          </span>
        </div>
        <div>
          <strong>Grapple.</strong>
          <span>
            Str. or Dex. saving throw. <em>on fail:</em> target gains Grappled
            condition.
          </span>
        </div>
        <div>
          <strong>Shove.</strong>
          <span>
            Str. or Dex. saving throw. <em>on fail:</em> target is pushed 5ft or
            target gains the Prone condition.
          </span>
        </div>
        <div>
          <strong>Dash.</strong>
          <span>Double your Speed (after modifiers)</span>
        </div>
        <div>
          <strong>Disengage.</strong>
          <span>
            Your movement this turn does not trigger Opportunity attacks.
          </span>
        </div>
        <div>
          <strong>Dodge.</strong>
          <span>
            Until the start of your next turn, any attack rolls against you have
            Disadvantage and you make Dex. saving throws with Advantage.
          </span>
        </div>
        <div>
          <strong>Help.</strong>
          <span>
            Help another creature with an ability check if you are proficient in
            it, or an attack roll, or administer first aid to an Unconscious
            creature: Medicine check (DC 10)
          </span>
        </div>
        <div>
          <strong>Hide.</strong>
          <span>
            Try to hide out of enemy's line of sight with a Stealth check (DC
            15).
          </span>
        </div>
        <div>
          <strong>Magic.</strong>
          <span>Cast a spell, use a magic item, or use a magical feature.</span>
        </div>
        <div>
          <strong>Ready.</strong>
          <span>
            Prepare an action or movement a a Reaction to a trigger you define
            which should happen before the start of your next turn. Consumes the
            resources required. Holding a spell requires Concentration.
          </span>
        </div>
        <div>
          <strong>Utilise.</strong>
          <span>
            Use a nonmagical object that requires an action for its use
          </span>
        </div>
        <div>
          <strong>Improvise.</strong>
          <span>
            Describe an action not detailed here, the DM tells you if that is
            possible and what kind of D20 Test you need to make if any.
          </span>
        </div>
      </div>
    </GameInfoPanel>
  );
}
