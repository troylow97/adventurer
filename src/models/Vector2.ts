export class Vector2 {
  constructor(
    public x = 0,
    public y = 0,
  ) {
    Vector2.assertFinite(this.x, this.y)
  }

  static get ZERO(): Vector2 {
    return new Vector2(0, 0)
  }

  static fromAngle(radians: number, magnitude = 1): Vector2 {
    Vector2.assertFinite(radians, magnitude)
    return new Vector2(Math.cos(radians) * magnitude, Math.sin(radians) * magnitude)
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y)
  }

  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y)
  }

  multiply(scalar: number): Vector2 {
    Vector2.assertFinite(scalar)
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  divide(scalar: number): Vector2 {
    Vector2.assertFinite(scalar)
    if (scalar === 0) {
      throw new RangeError('Cannot divide a Vector2 by zero.')
    }

    return new Vector2(this.x / scalar, this.y / scalar)
  }

  negate(): Vector2 {
    return new Vector2(-this.x, -this.y)
  }

  get lengthSquared(): number {
    return this.x * this.x + this.y * this.y
  }

  get length(): number {
    return Math.hypot(this.x, this.y)
  }

  normalized(): Vector2 {
    const length = this.length
    return length === 0 ? Vector2.ZERO : this.divide(length)
  }

  dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y
  }

  distanceTo(other: Vector2): number {
    return Math.hypot(this.x - other.x, this.y - other.y)
  }

  angle(): number {
    return Math.atan2(this.y, this.x)
  }

  rotated(radians: number): Vector2 {
    Vector2.assertFinite(radians)
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)
    return new Vector2(
      this.x * cosine - this.y * sine,
      this.x * sine + this.y * cosine,
    )
  }

  lerp(other: Vector2, t: number): Vector2 {
    Vector2.assertFinite(t)
    return new Vector2(
      this.x + (other.x - this.x) * t,
      this.y + (other.y - this.y) * t,
    )
  }

  clampLength(maxLength: number): Vector2 {
    Vector2.assertFinite(maxLength)
    if (maxLength < 0) {
      throw new RangeError('Maximum length must not be negative.')
    }

    const length = this.length
    return length > maxLength && length > 0
      ? this.multiply(maxLength / length)
      : this.clone()
  }

  equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y
  }

  private static assertFinite(...values: number[]): void {
    if (!values.every(Number.isFinite)) {
      throw new RangeError('Vector2 values must be finite numbers.')
    }
  }
}