import React from 'react';
import TodoDialogue from "../antd/todoDialogue";
import '../index.css';
import TaskBox from './taskBox'
import { useAuth } from '../context/AuthContext'

const taskSection = ({ mode, sectionName ,reTrigger}) => {
  const { tasks } = useAuth();
  const sectionTasks = tasks.filter(task => task.section === sectionName);

   // Sort tasks based on priority (Higher priority first)
   const sortedTasks = [...sectionTasks].sort((a, b) => a.priority - b.priority);

  return (
<div  className={`flex flex-col h-full w-1/3 min-w-[31.5%] mx-2 rounded-2xl overflow-hidden scrollbar-hide ${
        mode ? "bg-[white] text-black border-3 border-dashed border-slate-300" : "bg-[#24262c] text-white"
      }`}>

  <div className="flex flex-col sm:flex-row justify-between items-center text-sm top-0 p-3 rounded-lg m-2 [@media(max-width:1300px)]:flex-col">
    <div className="text-slate-500 font-bold text-[1.2rem]">
      {sectionName} ({sectionTasks.length})
    </div>
    <div className="flex items-center mt-2 sm:mt-0">
     
      <TodoDialogue mode={mode} type={sectionName} />
    </div>
  </div>

  {/* TaskBox Container with Scroll */}
  <div className="flex-1 overflow-y-auto px-2 scrollbar-hide m-5 ">
    
    {sortedTasks.map(task => (
      <TaskBox key={task._id} task={task} mode={mode} reTrigger={reTrigger} type={sectionName} />
    ))}
  </div>
</div>

  );
};

export default taskSection;
