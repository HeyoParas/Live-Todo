//React
import React from 'react'

//components
import {useAuth} from '../context/AuthContext';
import AssignTaskSection from "../component/assignTaskSection"

const assignTasks = ({mode}) => {
  const {assignTask:data} = useAuth();

  return (
    <div
    className="h-[84%] overflow-x-auto flex items-center justify-start gap-3 flex-nowrap w-full scrollbar-hide p-3"
    style={{
      background: mode ? "#ffffff" : "#2a2b2f",
    }}>
    {data?.assignedTaskscurrent.map((elem, index) => (
      <AssignTaskSection key={index} sectionName={elem} mode={mode} />
    ))}
  </div>
  )
}

export default assignTasks
