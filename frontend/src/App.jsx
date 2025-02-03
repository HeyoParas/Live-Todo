import { useState } from 'react'
import React from 'react'
import MainScreen from './authComponent/mainScreen'
import Login from './authComponent/login'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-full w -full m-[4%] shadow-lg'> 
    <MainScreen/>
    </div>
    </>
  )
}

export default App
