type CardinalDirectionSymbol = 'N' | 'S' | 'E' | 'W'
export type MoveCommand = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export class Direction {
  static readonly NORTH = new Direction('N', 'UP', 0, -1)
  static readonly SOUTH = new Direction('S', 'DOWN', 0, 1)
  static readonly EAST = new Direction('E', 'RIGHT', 1, 0)
  static readonly WEST = new Direction('W', 'LEFT', -1, 0)

  static fromMoveCommand(command: MoveCommand): Direction {
    switch (command) {
      case 'UP':
        return Direction.NORTH
      case 'DOWN':
        return Direction.SOUTH
      case 'LEFT':
        return Direction.WEST
      case 'RIGHT':
        return Direction.EAST
    }
  }

  private constructor(
    readonly cardinalDirection: CardinalDirectionSymbol,
    readonly moveCommand: MoveCommand,
    readonly dx: number,
    readonly dy: number,
  ) {}
}
