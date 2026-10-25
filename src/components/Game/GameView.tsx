import type { Vector2 } from '../../models/Vector2'
import type { Wall } from '../../models/Wall'
import adventurerImage from '../../assets/adventurer.svg'
import wallImage from '../../assets/wall.avif'
import './Game.css'

type GameViewProps = {
  width: number
  height: number
  location: Vector2
  walls: readonly Wall[]
  entrance: Vector2
  exit: Vector2
  seed: number
  roll: number | null
  onRoll: () => void
  onBack: () => void
}

function GameView({
  width,
  height,
  location,
  walls,
  entrance,
  exit,
  seed,
  roll,
  onRoll,
  onBack,
}: GameViewProps) {
  const wallLocations = new Set(walls.map((wall) => wall.y * width + wall.x))

  return (
    <section className="game-placeholder" aria-labelledby="game-title">
      <h2 id="game-title">Game</h2>
      <p>Your game will appear here.</p>
      <p>Game seed: {seed}</p>
      <div
        className="game-grid"
        role="grid"
        aria-label={`Game world, adventurer at column ${location.x + 1}, row ${location.y + 1}`}
        style={{
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: height }, (_, y) =>
          Array.from({ length: width }, (_, x) => {
            const isAdventurer = location.x === x && location.y === y
            const isWall = wallLocations.has(y * width + x)
            const isEntrance = entrance.x === x && entrance.y === y
            const isExit = exit.x === x && exit.y === y
            return (
              <div
                className={`game-cell${isAdventurer ? ' game-cell-adventurer' : ''}${isWall ? ' game-cell-wall' : ''}`}
                role="gridcell"
                aria-label={
                  isAdventurer
                    ? `Adventurer at column ${x + 1}, row ${y + 1}`
                    : isWall
                      ? `Wall at column ${x + 1}, row ${y + 1}`
                      : isEntrance
                        ? `Entrance at column ${x + 1}, row ${y + 1}`
                        : isExit
                          ? `Exit at column ${x + 1}, row ${y + 1}`
                          : `Passage at column ${x + 1}, row ${y + 1}`
                }
                key={`${x}-${y}`}
              >
                {isAdventurer ? (
                  <img className="adventurer-sprite" src={adventurerImage} alt="" />
                ) : isWall ? (
                  <img className="wall-sprite" src={wallImage} alt="" />
                ) : isExit ? (
                  'E'
                ) : isEntrance ? (
                  'I'
                ) : (
                  ''
                )}
              </div>
            )
          }),
        )}
      </div>
      <p className="game-controls">Move with arrow keys or W, A, S, D.</p>
      <button type="button" className="game-action" onClick={onRoll}>
        Roll d6
      </button>
      {roll !== null && <p>You rolled: {roll}</p>}
      <button type="button" className="game-action" onClick={onBack}>
        Back to welcome
      </button>
    </section>
  )
}

export default GameView
