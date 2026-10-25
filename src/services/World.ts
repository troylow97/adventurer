import type { Adventurer } from '../models/Adventurer'
import { Direction, type MoveCommand } from '../models/Direction'
import { Vector2 } from '../models/Vector2'
import type { Wall } from '../models/Wall'

export class World {
  readonly walls: readonly Wall[]

  constructor(
    readonly width: number,
    readonly height: number,
    walls: readonly Wall[] = [],
  ) {
    if (!Number.isSafeInteger(width) || width < 1) {
      throw new RangeError('World width must be a positive safe integer.')
    }

    if (!Number.isSafeInteger(height) || height < 1) {
      throw new RangeError('World height must be a positive safe integer.')
    }

    for (const wall of walls) {
      if (!this.contains(new Vector2(wall.x, wall.y))) {
        throw new RangeError('Walls must be placed inside the world.')
      }
    }

    this.walls = [...walls]
  }

  contains(vec2: Vector2): boolean {
    return (
      Number.isSafeInteger(vec2.x) &&
      Number.isSafeInteger(vec2.y) &&
      vec2.x >= 0 &&
      vec2.x < this.width &&
      vec2.y >= 0 &&
      vec2.y < this.height
    )
  }

  move(adventurer: Adventurer, command: MoveCommand): boolean {
    if (!this.contains(adventurer.location)) {
      throw new RangeError('Adventurer must be inside the world before moving.')
    }

    const direction = Direction.fromMoveCommand(command)
    const nextLocation = new Vector2(
      adventurer.location.x + direction.dx,
      adventurer.location.y + direction.dy,
    )

    if (
      !this.contains(nextLocation) ||
      this.walls.some((wall) => wall.occupies(nextLocation))
    ) {
      return false
    }

    adventurer.move(command)
    return true
  }
}
