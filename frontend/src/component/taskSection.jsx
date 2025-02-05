import React from 'react';
import add_todo from '../assets/add_view.svg';
import TodoDialogue from "../antd/todoDialogue";
import '../index.css';
import TaskBox from './taskBox'

import { useAuth } from '../../context/AuthContext'
const taskSection = ({ mode, sectionName }) => {
  const { tasks } = useAuth();
  const sectionTasks = tasks.filter(task => task.section === sectionName);

   // Sort tasks based on priority (Higher priority first)
   const sortedTasks = [...sectionTasks].sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex flex-col h-full w-1/3 min-w-[31.5%] mx-2 border-2 border-dashed border-black-300  rounded-lg'>
      <div className='flex flex-col sm:flex-row justify-between items-center text-sm top-0 p-3 rounded-lg m-2 [@media(max-width:1300px)]:flex-col'>
        <div className='text-slate-500 font-bold text-[1.2rem] '>
          {sectionName} ({sectionTasks.length})
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

      {/* Map sorted tasks to TaskBox */}
      {sortedTasks.map(task => (
        <TaskBox key={task._id} task={task} mode={mode} />
      ))}

    </div>
  );
};

export default taskSection;
