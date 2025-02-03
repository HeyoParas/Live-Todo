import { useState } from 'react'
import React from 'react'
import LoginScreen from './authComponent/loginScreen'
import SignupScreen from './authComponent/signupScreen'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center overflow-hidden p-4">
      <div className='w-full h-full  m-[4%] shadow-lg'> 
        <LoginScreen/>
      </div>
    </div>
  )
}

export default App
