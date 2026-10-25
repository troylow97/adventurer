import { Monster } from '../models/Monster'
import { Vector2 } from '../models/Vector2'
import type { World } from './World'
import { SeededRandom } from './SeededRandom'

export class MonsterGenerator {
  static generate(
    world: World,
    entrance: Vector2,
    exit: Vector2,
    random: SeededRandom,
  ): Monster {
    const availableLocations: Vector2[] = []

    for (let y = 1; y < world.height - 1; y += 1) {
      for (let x = 1; x < world.width - 1; x += 1) {
        const location = new Vector2(x, y)
        const farEnoughFromEntrance =
          Math.abs(x - entrance.x) + Math.abs(y - entrance.y) >= 5

        if (
          farEnoughFromEntrance &&
          !location.equals(exit) &&
          !world.walls.some((wall) => wall.occupies(location))
        ) {
          availableLocations.push(location)
        }
      }
    }

    if (availableLocations.length === 0) {
      throw new Error('Unable to place a monster in this dungeon.')
    }

    const location =
      availableLocations[random.nextInt(0, availableLocations.length - 1)]
    return new Monster(location, 'Cave Slime', 36, 5, 10)
  }
}
