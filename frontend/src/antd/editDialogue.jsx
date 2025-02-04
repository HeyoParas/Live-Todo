import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import { AuthContext } from '../AuthContext/authcontext';
import { message } from 'antd';
import edit from '../assets/edit.svg';

const editDialogue = ({ mode, id }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  const { data, setRefetch } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [associated, setAssociated] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      const allKeys = [data.todo, data.inProgress, data.done];
      allKeys.forEach(item => {
        let index = item.findIndex(task => task._id.toString() === id);
        if (index !== -1) {
          const task = item[index];
          setTaskTitle(task.taskTitle);
          setAssociated(task.associated);
          setProgress(Number(task.progress));
        }
      });
    }
  }, [isModalOpen, data, id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (data) => {
    try {
      await axios.patch(`http://localhost:5000/api/update/tasks/${id}`, data);
      message.success('Task updated successfully!');
      setIsModalOpen(false);
      reset();
      setRefetch(true);
    } catch (error) {
      message.error('Failed to update task. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <button
        className="rounded-full hover:bg-slate-50"
        style={{
          filter: mode ? 'none' : 'invert(1) brightness(0.8)',
        }}
        onClick={showModal}
      >
        <img src={edit} alt="edit" />
      </button>
      <Modal
        title="Edit Task"
        open={isModalOpen}
        onOk={handleSubmit(handleOk)}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <div className="p-4">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(handleOk)}>
            {/* taskTitle*/}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Title</label>
              <input
                {...register('taskTitle', { required: 'Task Title is required',
                  validate: value => value.trim()!== '' || 'Task Title cannot be blank.',
                 })}
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className={`border rounded p-2 ${errors.taskTitle ? 'border-red-500' : ''}`}
              />
                            {errors.taskTitle && (
                              <span className="text-red-500 text-xs">{errors.taskTitle.message}</span>
                            )}
            </div>
            {/* associated */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Associate With</label>
              <textarea
                {...register('associated',{
                  required: 'Task Association is required.',
                  validate: value => value.trim()!== '' || 'Association cannot be blank.',
 
                })}
                placeholder="Enter task Association"
                value={associated}
                onChange={(e) => setAssociated(e.target.value)}
                className={`border rounded p-2 ${errors.associated ? 'border-red-500' : ''}`}
              />
                            {errors.associated && (
                              <span className="text-red-500 text-xs">{errors.associated.message}</span>
                            )}
            </div>
            {/* Progress */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Progress (%)</label>
              <input
                {...register('progress', { valueAsNumber: true,
                  validate: value =>(value >= 0 && value <= 100)  || 'Progress must be between 0% and 100%.' 
                 })}
                type="number"
                placeholder="Enter progress percentage"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className={`border rounded p-2 ${errors.progress ? 'border-red-500' : ''}`}
                />
                              {errors.progress && (
                                <span className="text-red-500 text-xs">{errors.progress.message}</span>
                              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default editDialogue;
