import React, { useState } from "react";
import image from "../assets/image.png";
import Profile from "./profile";
import { Button, Modal } from "antd";
const App = ({ mode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };
  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };
  return (
    <>
      <button
        className="hover:bg-slate-600 hover:cursor-pointer rounded-full"
        onClick={showModal}
        //   onClick={handlePfp}
        style={{
          filter: mode ? "none" : "invert(1) brightness(0.8)",
        }}>
        <img src={image} alt="user" className="rounded-full" />
      </button>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        closable={true}
        onCancel={() => setIsModalOpen(false)}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Profile closeModal={() => setIsModalOpen(false)}/>
      </Modal>
    </>
  );
};
export default App;
