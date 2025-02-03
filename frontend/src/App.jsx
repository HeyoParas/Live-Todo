import { useState } from 'react'
import React from 'react'
import MainScreen from './authComponent/mainScreen'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainScreen/>
    </>
  )
}

export default App
