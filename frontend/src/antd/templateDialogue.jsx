import React, { useState, useContext } from "react";
import { Button, Modal, message } from "antd";
import { useForm } from "react-hook-form";
import axios from "axios";

const templateDialogue = ({ mode, type ,reTrigger}) => {
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
        const response = await axios.post("http://localhost:7000/addSection", data,{
            withCredentials:true,
        });
        message.success("Template added successfully!");
  
        setIsModalOpen(false);
        reset(); // Reset form after successful submission
      } catch (error) {
        console.error("Error adding template:", error);
        message.error("Failed to add template. Please try again.");
      }
      reTrigger(true); 
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
        New Template
      </Button>
      <Modal
        title="New Template"
        open={isModalOpen}
        onOk={handleSubmit(handleOk)}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        className={mode ? "light-modal" : "dark-modal"}
      >
        <div className="p-4">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(handleOk)}>
            {/* section  */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Section </label>
              <input
                {...register("section", { required: "Task section name is required." })}
                type="text"
                placeholder="Enter section title"
                className={`border rounded p-2 ${errors.taskTitle ? "border-red-500" : ""}`}
              />
              {errors.taskTitle && <span className="text-red-500 text-xs">{errors.taskTitle.message}</span>}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default templateDialogue;
