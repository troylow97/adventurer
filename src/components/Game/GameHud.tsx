import './Game.css'

type GameHudProps = {
  currentHealth: number
  maxHealth: number
}

function GameHud({ currentHealth, maxHealth }: GameHudProps) {
  const healthPercent = Math.max(
    0,
    Math.min(100, (currentHealth / maxHealth) * 100),
  )

  return (
    <aside className="game-hud" aria-label="Adventurer status">
      <div className="game-hud-label">
        <span>Adventurer</span>
        <span>
          {currentHealth} / {maxHealth} HP
        </span>
      </div>
      <div
        className="game-hud-track"
        role="progressbar"
        aria-label="Adventurer health"
        aria-valuemin={0}
        aria-valuemax={maxHealth}
        aria-valuenow={currentHealth}
      >
        <div
          className="game-hud-fill"
          style={{ width: `${healthPercent}%` }}
        />
      </div>
    </aside>
  )
}

export default GameHud
