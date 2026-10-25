import adventurerImage from '../../assets/adventurer.svg'
import entranceImage from '../../assets/dungeon-entrance.svg'
import exitImage from '../../assets/dungeon-exit.svg'
import monsterImage from '../../assets/monster.svg'
import type { Monster } from '../../models/Monster'
import wallImage from '../../assets/wall.avif'
import type { Vector2 } from '../../models/Vector2'
import type { Wall } from '../../models/Wall'
import GameHud from './GameHud'
import './Game.css'

type GameViewProps = {
  width: number
  height: number
  location: Vector2
  walls: readonly Wall[]
  entrance: Vector2
  exit: Vector2
  monster: Monster | null
  currentHealth: number
  maxHealth: number
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
  monster,
  currentHealth,
  maxHealth,
  roll,
  onRoll,
  onBack,
}: GameViewProps) {
  const wallLocations = new Set(walls.map((wall) => wall.y * width + wall.x))

  return (
    <section className="game-placeholder" aria-labelledby="game-title">
      <GameHud currentHealth={currentHealth} maxHealth={maxHealth} />
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
            const isMonster =
              monster !== null &&
              monster.location.x === x &&
              monster.location.y === y
            return (
              <div
                className={`game-cell${isAdventurer ? ' game-cell-adventurer' : ''}${isWall ? ' game-cell-wall' : ''}${isMonster ? ' game-cell-monster' : ''}`}
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
                          : isMonster
                            ? `${monster?.name ?? 'Monster'} at column ${x + 1}, row ${y + 1}`
                            : `Passage at column ${x + 1}, row ${y + 1}`
                }
                key={`${x}-${y}`}
              >
                {isAdventurer ? (
                  <img className="adventurer-sprite" src={adventurerImage} alt="" />
                ) : isWall ? (
                  <img className="wall-sprite" src={wallImage} alt="" />
                ) : isMonster ? (
                  <img className="monster-sprite" src={monsterImage} alt="" />
                ) : isExit ? (
                  <img className="landmark-sprite" src={exitImage} alt="" />
                ) : isEntrance ? (
                  <img className="landmark-sprite" src={entranceImage} alt="" />
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
