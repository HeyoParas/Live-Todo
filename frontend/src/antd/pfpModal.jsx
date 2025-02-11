import React, { useState } from "react";
import Profile from "./profile";
import { Button, Modal } from "antd";
import image from '../assets/image.jpg'

import {useAuth} from '../context/AuthContext'

const App = ({ mode }) => {
  const {userData} = useAuth();
  // console.log("inside header",userData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="hover:bg-slate-600 hover:cursor-pointer rounded-full"
        onClick={showModal}
        //   onClick={handlePfp}
        style={{
          filter: mode ? "none" : "invert(1) brightness(1)",
        }}
        >
        <img src={`http://localhost:7000${userData.profileImage}`|| image} alt={userData.username} className="rounded-full w-[30px] h-[30px]" />
      </button>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        closable={true}
        onCancel={() => setIsModalOpen(false)}
        style={{ top: 20 }}
        className="custom-modal">
        <Profile closeModal={() => setIsModalOpen(false)}/>
      </Modal>
    </>
  );
};
export default App;
