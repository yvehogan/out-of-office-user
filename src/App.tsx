import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-purple-dark font-sans p-8 text-center">
      <h1 className="font-serif text-6xl md:text-7xl mb-4 text-purple">
        Out of Office
      </h1>
      <p className="text-xl md:text-2xl font-light mb-8 max-w-xl leading-relaxed">
        Welcome to your React + Vite + TypeScript application configured with Tailwind CSS v4 and custom brand styling.
      </p>
      
      <button 
        onClick={() => setCount((c) => c + 1)}
        className="bg-purple-dark hover:bg-purple text-white font-ui text-base font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
      >
        Count is: {count}
      </button>
    </main>
  )
}

export default App
