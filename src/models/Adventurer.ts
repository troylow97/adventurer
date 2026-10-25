import { Direction, type MoveCommand } from './Direction'
import type { Health } from './Health'
import { Vector2 } from './Vector2'

export type { MoveCommand } from './Direction'

export class Adventurer {
  location: Vector2
  health: Health

  constructor(
    location: Vector2,
    health: Health,
  ) {
    if (!Number.isSafeInteger(location.x) || !Number.isSafeInteger(location.y)) {
      throw new RangeError('Adventurer coordinates must be safe integers.')
    }
    this.location = location
    this.health = health
  }

  move(command: MoveCommand): void {
    const direction = Direction.fromMoveCommand(command)
    const nextX = this.location.x + direction.dx
    const nextY = this.location.y + direction.dy

    if (!Number.isSafeInteger(nextX) || !Number.isSafeInteger(nextY)) {
      throw new RangeError('Movement would exceed the safe integer coordinate range.')
    }

    this.location = new Vector2(nextX, nextY)
  }
}
