import { Vector2 } from './Vector2'

export class Monster {
  readonly location: Vector2

  constructor(
    location: Vector2,
    readonly name: string,
    readonly maxHealth: number,
    readonly minAttackDamage: number,
    readonly maxAttackDamage: number,
  ) {
    if (!Number.isSafeInteger(location.x) || !Number.isSafeInteger(location.y)) {
      throw new RangeError('Monster coordinates must be safe integers.')
    }
    if (!name.trim()) {
      throw new RangeError('Monster name must not be empty.')
    }
    if (
      !Number.isSafeInteger(maxHealth) ||
      maxHealth < 1 ||
      !Number.isSafeInteger(minAttackDamage) ||
      minAttackDamage < 0 ||
      !Number.isSafeInteger(maxAttackDamage) ||
      maxAttackDamage < minAttackDamage
    ) {
      throw new RangeError('Monster health and attack damage must be valid integers.')
    }

    this.location = location.clone()
  }
}
