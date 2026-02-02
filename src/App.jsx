import { useState } from 'react'
import reactLogo from './assets/svg/react.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind is Working 🚀
        </h1>

        <p className="mt-4 text-gray-600">
          If this is styled, Tailwind CSS is installed correctly.
        </p>

        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Click Me
        </button>
      </div>
    </div>
  )
}

export default App
