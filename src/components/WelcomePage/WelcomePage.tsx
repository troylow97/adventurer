import { useState } from 'react'
import Game from '../Game/Game'
import './WelcomePage.css'

function WelcomePage() {
  const [showGame, setShowGame] = useState(false)
  const [seedInput, setSeedInput] = useState('')
  const [gameSeed, setGameSeed] = useState<number | undefined>()
  const [mazeOpenness, setMazeOpenness] = useState(50)

  if (showGame) {
    return (
      <Game
        seed={gameSeed}
        opennessPercent={mazeOpenness}
        onBack={() => setShowGame(false)}
      />
    )
  }

  function handleStartGame(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setGameSeed(seedInput.trim() === '' ? undefined : Number(seedInput))
    setShowGame(true)
  }

  return (
    <>
      <section id="center">
        <form className="game-start-form" onSubmit={handleStartGame}>
          <label htmlFor="game-seed">Game seed (optional)</label>
          <input
            id="game-seed"
            type="number"
            min="0"
            max="4294967295"
            step="1"
            value={seedInput}
            onChange={(event) => setSeedInput(event.target.value)}
            aria-describedby="game-seed-help"
          />
          <p id="game-seed-help">
            Enter a whole number from 0 to 4294967295, or leave blank for a
            random seed.
          </p>
          <label htmlFor="maze-openness">
            Maze openness: {mazeOpenness}%
          </label>
          <input
            id="maze-openness"
            type="range"
            min="0"
            max="100"
            step="5"
            value={mazeOpenness}
            onChange={(event) => setMazeOpenness(Number(event.target.value))}
            aria-describedby="maze-openness-help"
          />
          <p id="maze-openness-help">
            Higher openness removes more interior walls. The outer boundary
            stays intact.
          </p>
          <button type="submit" className="game-launch">
            Play game
          </button>
        </form>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default WelcomePage
