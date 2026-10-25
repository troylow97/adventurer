import type { Monster } from '../../models/Monster'
import adventurerImage from '../../assets/adventurer.svg'
import monsterImage from '../../assets/monster.svg'
import './Game.css'

type BattleResult = 'active' | 'victory' | 'defeat'

type BattleViewProps = {
  monster: Monster
  adventurerHealth: number
  monsterHealth: number
  result: BattleResult
  message: string
  onAttack: () => void
  onFlee: () => void
  onContinue: () => void
  onBack: () => void
}

function HealthBar({
  label,
  current,
  maximum,
}: {
  label: string
  current: number
  maximum: number
}) {
  const percentage = Math.max(0, Math.min(100, (current / maximum) * 100))

  return (
    <div className="battle-health">
      <div className="battle-health-label">
        <span>{label}</span>
        <span>
          {current} / {maximum} HP
        </span>
      </div>
      <div
        className="battle-health-track"
        role="progressbar"
        aria-label={`${label} health`}
        aria-valuemin={0}
        aria-valuemax={maximum}
        aria-valuenow={current}
      >
        <div className="battle-health-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function BattleView({
  monster,
  adventurerHealth,
  monsterHealth,
  result,
  message,
  onAttack,
  onFlee,
  onContinue,
  onBack,
}: BattleViewProps) {
  return (
    <section className="battle-screen" aria-labelledby="battle-title">
      <h2 id="battle-title">A wild {monster.name} appeared!</h2>
      <div className="battle-stage">
        <div className="battle-monster">
          <img src={monsterImage} alt={monster.name} />
        </div>
        <HealthBar
          label={monster.name}
          current={monsterHealth}
          maximum={monster.maxHealth}
        />
        <div className="battle-adventurer">
          <img src={adventurerImage} alt="Adventurer" />
        </div>
        <HealthBar
          label="Adventurer"
          current={adventurerHealth}
          maximum={100}
        />
      </div>
      <p className="battle-message" aria-live="polite">
        {message}
      </p>
      <div className="battle-actions">
        {result === 'active' ? (
          <>
            <button type="button" className="game-action" onClick={onAttack}>
              Attack
            </button>
            <button type="button" className="game-action" onClick={onFlee}>
              Run away
            </button>
          </>
        ) : result === 'victory' ? (
          <button type="button" className="game-action" onClick={onContinue}>
            Continue exploring
          </button>
        ) : (
          <button type="button" className="game-action" onClick={onBack}>
            Return to welcome
          </button>
        )}
      </div>
    </section>
  )
}

export default BattleView
