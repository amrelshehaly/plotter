import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-blue-950 min-h-screen">
      <h1 className="text-4xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}

export default App
