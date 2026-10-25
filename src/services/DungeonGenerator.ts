import { Vector2 } from '../models/Vector2'
import { Wall } from '../models/Wall'
import { SeededRandom } from './SeededRandom'
import { World } from './World'

const WORLD_WIDTH = 20
const WORLD_HEIGHT = 20

type MazeStep = {
  dx: number
  dy: number
}

export type GeneratedDungeon = {
  world: World
  entrance: Vector2
  exit: Vector2
}

export class DungeonGenerator {
  static generate(
    random: SeededRandom,
    opennessPercent = 50,
  ): GeneratedDungeon {
    if (
      !Number.isInteger(opennessPercent) ||
      opennessPercent < 0 ||
      opennessPercent > 100
    ) {
      throw new RangeError('Maze openness must be an integer between 0 and 100.')
    }

    const mazeCellColumns = (WORLD_WIDTH - 2) / 2
    const mazeCellRows = (WORLD_HEIGHT - 2) / 2
    const visited = Array.from({ length: mazeCellRows }, () =>
      Array<boolean>(mazeCellColumns).fill(false),
    )
    const passages = new Set<string>()
    const steps: readonly MazeStep[] = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
    ]
    const carve = (x: number, y: number) => passages.add(`${x},${y}`)

    const visit = (cellX: number, cellY: number) => {
      visited[cellY][cellX] = true
      const x = cellX * 2 + 1
      const y = cellY * 2 + 1
      carve(x, y)
      const shuffledSteps = [...steps]

      for (let index = shuffledSteps.length - 1; index > 0; index -= 1) {
        const swapIndex = random.nextInt(0, index)
        const step = shuffledSteps[index]
        shuffledSteps[index] = shuffledSteps[swapIndex]
        shuffledSteps[swapIndex] = step
      }

      for (const { dx, dy } of shuffledSteps) {
        const nextCellX = cellX + dx
        const nextCellY = cellY + dy

        if (
          DungeonGenerator.isOutOfBoundsOrVisited(
            nextCellX,
            nextCellY,
            mazeCellColumns,
            mazeCellRows,
            visited,
          )
        ) {
          continue
        }

        carve(x + dx, y + dy)
        visit(nextCellX, nextCellY)
      }
    }

    visit(0, 0)

    const entrance = new Vector2(0, 1)
    const exit = new Vector2(WORLD_WIDTH - 1, WORLD_HEIGHT - 3)
    carve(entrance.x, entrance.y)
    carve(exit.x - 1, exit.y)
    carve(exit.x, exit.y)

    const remainingWalls: Vector2[] = []
    for (let y = 1; y < WORLD_HEIGHT - 1; y += 1) {
      for (let x = 1; x < WORLD_WIDTH - 1; x += 1) {
        if (!passages.has(`${x},${y}`)) {
          remainingWalls.push(new Vector2(x, y))
        }
      }
    }

    for (let index = remainingWalls.length - 1; index > 0; index -= 1) {
      const swapIndex = random.nextInt(0, index)
      const wall = remainingWalls[index]
      remainingWalls[index] = remainingWalls[swapIndex]
      remainingWalls[swapIndex] = wall
    }

    const wallsToRemove = Math.floor(
      (remainingWalls.length * opennessPercent) / 100,
    )
    for (const openedCell of remainingWalls.slice(0, wallsToRemove)) {
      carve(openedCell.x, openedCell.y)
    }

    const walls: Wall[] = []
    for (let y = 0; y < WORLD_HEIGHT; y += 1) {
      for (let x = 0; x < WORLD_WIDTH; x += 1) {
        if (!passages.has(`${x},${y}`)) {
          walls.push(new Wall(new Vector2(x, y)))
        }
      }
    }

    return {
      world: new World(WORLD_WIDTH, WORLD_HEIGHT, walls),
      entrance,
      exit,
    }
  }

  private static isOutOfBoundsOrVisited(
    cellX: number,
    cellY: number,
    columns: number,
    rows: number,
    visited: boolean[][],
  ): boolean {
    return (
      cellX < 0 ||
      cellX >= columns ||
      cellY < 0 ||
      cellY >= rows ||
      visited[cellY][cellX]
    )
  }
}
