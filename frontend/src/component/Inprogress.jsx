import React from 'react';
import add_todo from '../assets/add_view.svg';
import TodoContent from './TodoContent';
import TodoDialogue from "../antd/todoDialogue";

// import '../styles.css';

const Inprogress = ({ mode, data }) => {
  const inprogress = data?.inProgress || [];

  //console.log("Inprogress array:", inprogress);

  return (
    <div className='flex flex-col h-full border-2 border-dashed border-gray-300 rounded-lg'>
      <div className='flex flex-col sm:flex-row justify-between items-center text-sm top-0 p-3 rounded-lg m-2 [@media(max-width:1300px)]:flex-col'>
        <div className='text-slate-500 font-bold text-[1.2rem]'>
          In Progress ({inprogress.length})
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
          <TodoDialogue mode={mode} type="inprogress"/>
        </div>
      </div>
      <div className='h-full w-full overflow-y-auto hide-scrollbar p-1 my-1'>
        {inprogress.map((todo, index) => (
          <div key={index} className='h-55 m-2 rounded-xl border border-gray-400'>
            <TodoContent mode={mode} data={todo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inprogress;
