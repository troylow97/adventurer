import { useState } from 'react'
import WelcomePage from './components/WelcomePage/WelcomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <WelcomePage
      count={count}
      onIncrement={() => setCount((currentCount) => currentCount + 1)}
    />
  )
}

export default App
