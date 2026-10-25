import { useEffect, useState } from 'react'
import { Adventurer } from '../../models/Adventurer'
import { DungeonGenerator } from '../../services/DungeonGenerator'
import { KeyboardInputHandler } from '../../services/KeyboardInputHandler'
import { SeededRandom } from '../../services/SeededRandom'
import GameView from './GameView'
import { Health } from '../../models/Health'

type GameProps = {
  seed?: number
  opennessPercent: number
  onBack: () => void
}

function Game({ seed, opennessPercent, onBack }: GameProps) {
  const [random] = useState(() => new SeededRandom(seed))
  const [dungeon] = useState(() =>
    DungeonGenerator.generate(random, opennessPercent),
  )
  const { world, entrance, exit } = dungeon
  const [location, setLocation] = useState(() => entrance.clone())
  const [roll, setRoll] = useState<number | null>(null)

  useEffect(() => {
    const inputHandler = new KeyboardInputHandler((command) => {
      setLocation((currentLocation) => {
        const adventurer = new Adventurer(currentLocation.clone(), new Health(100))
        return world.move(adventurer, command) ? adventurer.location : currentLocation
      })
    })

    return inputHandler.attach(window)
  }, [world])

  return (
    <GameView
      width={world.width}
      height={world.height}
      location={location}
      walls={world.walls}
      entrance={entrance}
      exit={exit}
      seed={random.seed}
      roll={roll}
      onRoll={() => setRoll(random.nextInt(1, 6))}
      onBack={onBack}
    />
  )
}

export default Game
