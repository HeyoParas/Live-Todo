import React, { useState, useContext } from "react";
import { Button, Modal, message } from "antd";
import { useForm } from "react-hook-form";
import axios from "axios";
// import { AuthContext } from "../AuthContext/authcontext";

const TodoDialogue = ({ mode, type }) => {
  const { setRefetch } = useContext(AuthContext);
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
    console.log(data);
    try {
      const endpointMap = {
        todo: "http://localhost:5000/api/tasks/todo",
        inprogress: "http://localhost:5000/api/tasks/inprogress",
        done: "http://localhost:5000/api/tasks/done",
      };

      await axios.post(endpointMap[type], data);
      message.success("Task added successfully!");

      setIsModalOpen(false);
      reset();
      setRefetch(true);
    } catch (error) {
      console.error("Error adding task:", error);
      message.error("Failed to add task. Please try again.");
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
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(handleOk)}
          >
            {/* Username */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Username</label>
              <input
                {...register("username", {
                  required: "Username is required.",
                  validate: (value) =>
                    value.trim() !== "" || "Username cannot be blank.",
                })}
                type="text"
                placeholder="Enter username"
                className={`border rounded p-2 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Task Title */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Task Title</label>
              <input
                {...register("taskTitle", {
                  required: "Task Title is required.",
                  validate: (value) =>
                    value.trim() !== "" || "Task Title cannot be blank.",
                })}
                type="text"
                placeholder="Enter task title"
                className={`border rounded p-2 ${
                  errors.taskTitle ? "border-red-500" : ""
                }`}
              />
              {errors.taskTitle && (
                <span className="text-red-500 text-xs">
                  {errors.taskTitle.message}
                </span>
              )}
            </div>

            {/* Associated */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Associate With</label>
              <textarea
                {...register("associated", {
                  required: "Task Association is required.",
                  validate: (value) =>
                    value.trim() !== "" || "Task Association cannot be blank.",
                })}
                placeholder="Enter task association"
                className={`border rounded p-2 ${
                  errors.associated ? "border-red-500" : ""
                }`}
              />
              {errors.associated && (
                <span className="text-red-500 text-xs">
                  {errors.associated.message}
                </span>
              )}
            </div>

            {/* Progress */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Progress (%)</label>
              <input
                {...register("progress", {
                  required: "Progress is required.",
                  valueAsNumber: true,
                  validate: (value) =>
                    (value >= 0 && value <= 100) ||
                    "Progress must be between 0% and 100%.",
                })}
                type="number"
                placeholder="Enter progress percentage"
                className={`border rounded p-2 ${
                  errors.progress ? "border-red-500" : ""
                }`}
                defaultValue={0} 
              />
              {errors.progress && (
                <span className="text-red-500 text-xs">
                  {errors.progress.message}
                </span>
              )}
            </div>
              {/* Status */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Status</label>
                <input
                  {...register("status", {
                    required: "Status is required.",
                  })}
                  disabled  
                  value={type} 
                  className={`border rounded p-2 ${errors.status ? "border-red-500" : ""}`}
                />
                {errors.status && (
                  <span className="text-red-500 text-xs">
                    {errors.status.message}
                  </span>
                )}
              </div>


            {/* Assign Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Assign Date</label>
              <input
                {...register("assignDate", {
                  required: "Correct Assign Date is required.",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const minDate = new Date("2000-01-01");
                    const maxDate = new Date();
                    return (
                      (selectedDate >= minDate && selectedDate <= maxDate) ||
                      "Year must be between 2000 and the current year."
                    );
                  },
                })}
                type="date"
                className={`border rounded p-2 ${
                  errors.assignDate ? "border-red-500" : ""
                }`}
              />
              {errors.assignDate && (
                <span className="text-red-500 text-xs">
                  {errors.assignDate.message}
                </span>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TodoDialogue;
