import React from 'react'
import add_view from '../assets/add_view.svg'
import board_view from '../assets/board_view.svg'
import more from '../assets/more.svg'
import { useState } from 'react'
import TemplateDialogue from '../antd/templateDialogue'
const Navbar = ({mode}) => {
  
  return (
    <div className='flex justify-between items-center bg-white text-black text-lg'
    style={{
      background: mode ? "#ffffff" : "#2a2b2f", 
      color: mode? "#000000" : "#ffffff",  
    }}>
      <div className='flex items-center ml-5 space-x-8'
              style={{
                filter: mode ? "none" : "invert(.5) brightness(3)",
              }}>
        <div className='flex items-center space-x-2 hover:cursor-pointer'>
          <img src={board_view} alt="board_view" />
          <span >Board view</span>
        </div>
        <div className='flex items-center space-x-2 hover:cursor-pointer'>
          <img src={add_view} alt="add_view" />
          <span>Add view</span>
        </div>
      </div>
      <div className='flex items-center mr-8 p-2 space-x-5'>
        <div className='hover:cursor-pointer font-bold'><button>Filter</button></div>
        <div className='hover:cursor-pointer'><button>Sort</button></div>
        <div className='hover:cursor-pointer'><img src={more} alt="more" /></div>
        <div className='hover:cursor-pointer'>
          {/* <button className='rounded-full bg-black text-white p-2' >New template</button> */}
          <TemplateDialogue/>
          </div>
      </div>
    </div>
  )
}

export default Navbar
