import { useState } from 'react'

import './App.css'
import HomePage from './pages/home-page'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div>
      <HomePage />
    </div>
  )
}

export default App
