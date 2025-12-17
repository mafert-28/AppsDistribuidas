import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Distributed Applications</h1>
      <div className="card">

        {/* Botón 1: incrementa de 1 */}
        <button onClick={() => setCount1(c => c + 1)}>
          Contador 1: {count1}
        </button>

        {/* Botón 2: incrementa de 3 */}
        <button onClick={() => setCount2(c => c + 3)}>
          Contador 2: {count2}
        </button>

        <p>
          Edit <code>src/Victor Alonso Camargo Flores.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
