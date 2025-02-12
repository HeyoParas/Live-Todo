//React
import React from 'react'
import { Empty } from 'antd';


//components
import {useAuth} from '../context/AuthContext';
import AssignTaskSection from "../component/assignTaskSection"

const assignTasks = ({mode}) => {
  const {assignTask} = useAuth();
  console.log(assignTask)
    if (assignTask.length == 0) {
      return (
        <div className=' p-50 h-[100%]'
        style={{
          background: mode ? "#ffffff" : "#2a2b2f",
        }}>
          <Empty/>
        </div>
      );
    }

  return (
    <div
    className="h-[84%] overflow-x-auto flex items-center justify-start gap-3 flex-nowrap w-full scrollbar-hide p-3"
    style={{
      background: mode ? "#ffffff" : "#2a2b2f",
    }}>
    {assignTask?.assignedTaskscurrent.map((elem, index) => (
      <AssignTaskSection key={index} sectionName={elem} mode={mode} />
    ))}
  </div>
  )
}

export default assignTasks
