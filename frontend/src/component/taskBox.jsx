import React from 'react'
import { useState } from 'react';
import more from '../assets/More.svg';
import hamburger from '../assets/hamburger.svg';
import comment from '../assets/comment.svg';
import link from '../assets/link.svg';
import DeletePopUp from '../antd/deletePopUp';
// import { AuthContext } from '../AuthContext/authcontext';
import axios from 'axios';
import EditDialogue from '../antd/editDialogue';

import '../index.css';
import { message, Popconfirm } from 'antd';
const taskBox = ({task , mode}) => {
  const [deleteVisible, setDeleteVisible] = useState(false); 
  return (
    <div className='gap-y-4 space-y-4 p-3'>
      <div className='flex items-center justify-between'>
        <div>
          <div className="text-md font-bold">helo</div>
          <div className='text-gray-800 text-opacity-60'
            style={{
              color: mode ? "#949598" : "#ffffff",
            }}
          >
            {task?.associated}
          </div>
        </div>
        <div className='flex items-center gap-x-4'>
        {/* <EditDialogue mode={mode} id={task?._id}/> */}

          {/* <Popconfirm
            title="Are you sure you want to delete this task?"
            open={deleteVisible}
            onConfirm={() => deleteTask(task?._id)}
            onCancel={() => setDeleteVisible(false)} 
            okText="Yes"
            cancelText="No"
            onVisibleChange={(visible) => setDeleteVisible(visible)} 
          >
            <button className="rounded-full hover:bg-slate-50">
              <img src={more} alt="more" />
            </button>
          </Popconfirm> */}
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between mb-1'>
          <div className='flex text-sm font-bold text-gray-800 text-opacity-60'
            style={{
              color: mode ? "#949598" : "#ffffff",
            }}
          >
            <button className="rounded-full hover:bg-slate-50"
              style={{
                filter: mode ? "none" : "invert(1) brightness(0.8)",
              }}
            >
              <img src={hamburger} alt="hamburger" />
            </button>
            Progress
          </div>
          <div className='text-sm font-bold'>1/100</div>
        </div>
        <div className='flex items-center justify-center w-full'>
          <div
            className="progress-bar-wrapper"
            style={{
              width: '90%',
              height: '7px',
              borderRadius: '10px',
              backgroundColor: '#e0e0e0', 
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${task?.progress}%`,
                height: '100%',
                borderRadius: '10px',
                backgroundColor: task?.progress === 100 ? '#78d700' : task?.progress <= 30 ? '#ff7979' : '#ffa048'
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='bg-slate-200 box-content border-4 text-sm w-30 h-5 rounded-full  font-bold text-gray-400'>70</div>
        <div className='flex items-center gap-x-4'
          style={{
            filter: mode ? "none" : "invert(1) brightness(0.8)",
          }}
        >
          <div className='flex'>
            <button className="rounded-full hover:bg-slate-50">
              <img src={comment} alt="comment" />
            </button>
            6
          </div>
          <div className='flex'>
            <button className="rounded-full hover:bg-slate-50">
              <img src={link} alt="link" />
            </button>
            4
          </div>
        </div>
      </div>
    </div>
  );
};

export default taskBox