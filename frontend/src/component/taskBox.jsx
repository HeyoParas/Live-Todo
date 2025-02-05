import React from 'react'

const taskBox = ({task}) => {
  return (
    <div>
      {task.tasktitle}
      {task.priority}
    </div>
  )
}

export default taskBox