import { useState } from 'react'
import React from 'react'
import LoginScreen from './authComponent/loginScreen'
import SignupScreen from './authComponent/signupScreen'
import './App.css'

function App() {

  return (
    <>
    <div className='h-full w -full m-[4%] shadow-lg'> 
    <LoginScreen/>
    </div>
    </>
  )
}

export default App
