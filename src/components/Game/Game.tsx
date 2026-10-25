import { useEffect, useState } from 'react'
import { Adventurer } from '../../models/Adventurer'
import type { MoveCommand } from '../../models/Direction'
import { Health } from '../../models/Health'
import { DungeonGenerator } from '../../services/DungeonGenerator'
import { KeyboardInputHandler } from '../../services/KeyboardInputHandler'
import { MonsterGenerator } from '../../services/MonsterGenerator'
import { SeededRandom } from '../../services/SeededRandom'
import BattleIntro from './BattleIntro'
import BattleView from './BattleView'
import GameView from './GameView'

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
  const [monster] = useState(() =>
    MonsterGenerator.generate(world, entrance, exit, random),
  )
  const [location, setLocation] = useState(() => entrance.clone())
  const [adventurerHealth, setAdventurerHealth] = useState(100)
  const [monsterHealth, setMonsterHealth] = useState(monster.maxHealth)
  const [battleResult, setBattleResult] = useState<
    'exploring' | 'intro' | 'active' | 'victory' | 'defeat' | 'fled'
  >('exploring')
  const [battleMessage, setBattleMessage] = useState('')
  const [monsterDefeated, setMonsterDefeated] = useState(false)
  const [roll, setRoll] = useState<number | null>(null)

  useEffect(() => {
    const moveAdventurer = (command: MoveCommand) => {
      if (
        battleResult === 'intro' ||
        battleResult === 'active' ||
        battleResult === 'victory' ||
        battleResult === 'defeat'
      ) {
        return
      }

      const adventurer = new Adventurer(
        location.clone(),
        new Health(adventurerHealth),
      )
      if (!world.move(adventurer, command)) {
        return
      }

      setLocation(adventurer.location)
      const isBesideMonster =
        Math.abs(adventurer.location.x - monster.location.x) +
          Math.abs(adventurer.location.y - monster.location.y) ===
        1

      if (isBesideMonster && !monsterDefeated && battleResult !== 'fled') {
        setBattleResult('intro')
        setBattleMessage(`A wild ${monster.name} appeared!`)
      } else if (!isBesideMonster && battleResult === 'fled') {
        setBattleResult('exploring')
      }
    }

    const inputHandler = new KeyboardInputHandler(moveAdventurer)

    return inputHandler.attach(window)
  }, [
    adventurerHealth,
    battleResult,
    location,
    monster,
    monsterDefeated,
    world,
  ])

  useEffect(() => {
    if (battleResult !== 'intro') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setBattleResult('active')
      setBattleMessage(`The ${monster.name} is ready to fight!`)
    }, 1100)

    return () => window.clearTimeout(timeoutId)
  }, [battleResult, monster.name])

  function handleAttack() {
    if (battleResult !== 'active') {
      return
    }

    const adventurerDamage = random.nextInt(12, 20)
    const remainingMonsterHealth = Math.max(
      0,
      monsterHealth - adventurerDamage,
    )
    setMonsterHealth(remainingMonsterHealth)

    if (remainingMonsterHealth === 0) {
      setBattleResult('victory')
      setBattleMessage(
        `You dealt ${adventurerDamage} damage. The ${monster.name} was defeated!`,
      )
      return
    }

    const monsterDamage = random.nextInt(
      monster.minAttackDamage,
      monster.maxAttackDamage,
    )
    const remainingAdventurerHealth = Math.max(
      0,
      adventurerHealth - monsterDamage,
    )
    setAdventurerHealth(remainingAdventurerHealth)

    if (remainingAdventurerHealth === 0) {
      setBattleResult('defeat')
      setBattleMessage(
        `You dealt ${adventurerDamage} damage. The ${monster.name} hit you for ${monsterDamage}. You were defeated.`,
      )
      return
    }

    setBattleMessage(
      `You dealt ${adventurerDamage} damage. The ${monster.name} hit you for ${monsterDamage}.`,
    )
  }

  function handleFlee() {
    if (battleResult !== 'active') {
      return
    }

    setBattleResult('fled')
    setBattleMessage(`You escaped from the ${monster.name}.`)
  }

  return (
    <>
      {battleResult === 'intro' && <BattleIntro monster={monster} />}
      {(battleResult === 'active' ||
        battleResult === 'victory' ||
        battleResult === 'defeat') && (
        <BattleView
          monster={monster}
          adventurerHealth={adventurerHealth}
          monsterHealth={monsterHealth}
          result={battleResult}
          message={battleMessage}
          onAttack={handleAttack}
          onFlee={handleFlee}
          onContinue={() => {
            setMonsterDefeated(true)
            setBattleResult('exploring')
          }}
          onBack={onBack}
        />
      )}
      {(battleResult === 'exploring' ||
        battleResult === 'fled' ||
        monsterDefeated) && (
        <GameView
          width={world.width}
          height={world.height}
          location={location}
          walls={world.walls}
          entrance={entrance}
          exit={exit}
          monster={monsterDefeated ? null : monster}
          currentHealth={adventurerHealth}
          maxHealth={100}
          roll={roll}
          onRoll={() => setRoll(random.nextInt(1, 6))}
          onBack={onBack}
        />
      )}
    </>
  )
}

export default Game
