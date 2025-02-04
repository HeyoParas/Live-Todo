import React from 'react';
import add_todo from '../assets/add_view.svg';
import TodoContent from './TodoContent';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TodoDialogue from "../antd/todoDialogue";
import '../index.css';

const taskSection = ({ mode, data ,setData , sectionName }) => {
  // console.log(sectionName);

  const todos = data?.todo || [];
  
  //console.log("Extracted todos:", todos);

  return (
    <div className='flex flex-col h-full border-2 border-dashed border-black-300 rounded-lg'>
      <div className='flex flex-col sm:flex-row justify-between items-center text-sm top-0 p-3 rounded-lg m-2 [@media(max-width:1300px)]:flex-col'>
        <div className='text-slate-500 font-bold text-[1.2rem] '>
          {sectionName} ({todos.length})
        </div>
        <div className='flex items-center mt-2 sm:mt-0'>
          <img 
            src={add_todo} 
            alt="add_todo" 
            className='w-7 h-7 object-contain'
            style={{
              filter: mode ? "none" : "invert(1) brightness(0.8)",
            }} 
          />
          <TodoDialogue mode={mode} type={sectionName}  />
        </div>
      </div>
    </div>
  );
};

export default taskSection;
