import type { Monster } from '../../models/Monster'
import monsterImage from '../../assets/monster.svg'
import './Game.css'

type BattleIntroProps = {
  monster: Monster
}

function BattleIntro({ monster }: BattleIntroProps) {
  return (
    <section className="battle-intro" aria-label="Encounter starting">
      <div className="battle-intro-flash" />
      <img className="battle-intro-monster" src={monsterImage} alt="" />
      <p className="battle-intro-message" role="status">
        A wild {monster.name} appeared!
      </p>
    </section>
  )
}

export default BattleIntro
