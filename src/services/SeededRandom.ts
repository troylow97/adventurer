const MAX_SEED = 0xffffffff

export class SeededRandom {
  readonly seed: number
  private state: number

  constructor(seed = SeededRandom.generateSeed()) {
    if (!Number.isInteger(seed) || seed < 0 || seed > MAX_SEED) {
      throw new RangeError(`Seed must be an integer between 0 and ${MAX_SEED}.`)
    }

    this.seed = seed
    this.state = seed
  }

  static generateSeed(): number {
    if (!globalThis.crypto?.getRandomValues) {
      throw new Error('A secure random number generator is not available.')
    }

    return globalThis.crypto.getRandomValues(new Uint32Array(1))[0]
  }

  next(): number {
    let value = (this.state += 0x6d2b79f5)
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)

    this.state >>>= 0
    return ((value ^ (value >>> 14)) >>> 0) / 0x100000000
  }

  nextInt(min: number, max: number): number {
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) {
      throw new RangeError('Bounds must be safe integers with min less than or equal to max.')
    }

    const range = max - min + 1
    if (range > 0x100000000) {
      throw new RangeError('The requested range must not exceed 2^32 values.')
    }

    return min + Math.floor(this.next() * range)
  }
}
