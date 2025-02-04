import React, { useState, useContext } from "react";
import { Button, Modal, message } from "antd";
import { useForm } from "react-hook-form";
import axios from "axios";

const TodoDialogue = ({ mode, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (data) => {
    console.log("Sending data to backend:", data);
  
    try {
      const response = await axios.post(
        "http://localhost:7000/addTask", 
        data,
        { withCredentials: true } 
      );
  
      console.log("Response from backend:", response.data);
      message.success(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
      message.error(error)
    }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <Button
        className="border-none font-bold text-[1rem]"
        onClick={showModal}
        style={{
          color: mode ? "#000000" : "#ffffff",
          background: mode ? "#ffffff" : "#2A2B2F",
        }}
      >
        Add New Task
      </Button>
      <Modal
        title="Add New Task"
        open={isModalOpen}
        onOk={handleSubmit(handleOk)}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        className={mode ? "light-modal" : "dark-modal"}
      >
        <div className="p-4">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(handleOk)}>
            {/* Task Title */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Title</label>
              <input
                {...register("tasktitle", { required: "Task Title is required." })}
                type="text"
                placeholder="Enter task title"
                className={`border rounded p-2 ${errors.taskTitle ? "border-red-500" : ""}`}
              />
              {errors.taskTitle && <span className="text-red-500 text-xs">{errors.taskTitle.message}</span>}
            </div>

            {/* Task Description */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Description</label>
              <textarea
                {...register("taskDescription", { required: "Task Description is required." })}
                placeholder="Enter task description"
                className={`border rounded p-2 ${errors.taskDescription ? "border-red-500" : ""}`}
              />
              {errors.taskDescription && <span className="text-red-500 text-xs">{errors.taskDescription.message}</span>}
            </div>

            {/* Section */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Section</label>
              <input
                {...register("section", { required: "Section is required." })}
                type="text"
                value={type}
                disabled
                placeholder="Enter section"
                className={`border rounded p-2 ${errors.section ? "border-red-500" : ""}`}
              />
              {errors.section && <span className="text-red-500 text-xs">{errors.section.message}</span>}
            </div>

            {/* Progress (1-10) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Progress (1-10)</label>
              <input
                {...register("currentProgress", {
                  required: "Progress is required.",
                  valueAsNumber: true,
                  validate: (value) => (value >= 1 && value <= 10) || "Progress must be between 1 and 10.",
                })}
                type="number"
                placeholder="Enter progress"
                className={`border rounded p-2 ${errors.progress ? "border-red-500" : ""}`}
              />
              {errors.progress && <span className="text-red-500 text-xs">{errors.progress.message}</span>}
            </div>

            {/* Assign Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Assign Date</label>
              <input
                {...register("assignDate", { required: "Assign Date is required." })}
                type="date"
                className={`border rounded p-2 ${errors.assignDate ? "border-red-500" : ""}`}
              />
              {errors.assignDate && <span className="text-red-500 text-xs">{errors.assignDate.message}</span>}
            </div>

            {/* Due Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Due Date</label>
              <input
                {...register("dueDate", { required: "Due Date is required." })}
                type="date"
                className={`border rounded p-2 ${errors.dueDate ? "border-red-500" : ""}`}
              />
              {errors.dueDate && <span className="text-red-500 text-xs">{errors.dueDate.message}</span>}
            </div>

            {/* Priority (1-10) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Priority (1-10)</label>
              <input
                {...register("priority", {
                  required: "Priority is required.",
                  valueAsNumber: true,
                  validate: (value) => (value >= 1 && value <= 10) || "Priority must be between 1 and 10.",
                })}
                type="number"
                placeholder="Enter priority"
                className={`border rounded p-2 ${errors.priority ? "border-red-500" : ""}`}
              />
              {errors.priority && <span className="text-red-500 text-xs">{errors.priority.message}</span>}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TodoDialogue;
