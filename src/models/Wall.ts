import { Vector2 } from './Vector2'

export class Wall {
  readonly x: number
  readonly y: number

  constructor(location: Vector2) {
    if (!Number.isSafeInteger(location.x) || !Number.isSafeInteger(location.y)) {
      throw new RangeError('Wall coordinates must be safe integers.')
    }

    this.x = location.x
    this.y = location.y
  }

  occupies(location: Vector2): boolean {
    return this.x === location.x && this.y === location.y
  }
}
