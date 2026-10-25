import { useState, type FormEvent } from 'react'
import heroImg from '../../assets/hero.png'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'
import Game from '../Game/Game'
import './WelcomePage.css'

type WelcomePageProps = {
  count: number
  onIncrement: () => void
}

function WelcomePage({ count, onIncrement }: WelcomePageProps) {
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

  function handleStartGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setGameSeed(seedInput.trim() === '' ? undefined : Number(seedInput))
    setShowGame(true)
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button type="button" className="counter" onClick={onIncrement}>
          Count is {count}
        </button>
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

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default WelcomePage
