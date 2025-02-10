import React, { useState } from "react";
import Profile from "./profile";

import ReportChart from './reportChart'
import { Button, Modal } from "antd";

const App = ({ mode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="block w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-500"
        onClick={showModal} 
      >
        Report
      </button>

      <Modal
        title="Profile Report"
        open={isModalOpen}
        footer={null} 
        closable={true}
        onCancel={() => setIsModalOpen(false)} 
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }} 
      >
           <ReportChart/>
      </Modal>
    </>
  );
};

export default App;
