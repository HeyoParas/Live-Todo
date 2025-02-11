import React, { useState } from "react";
import Profile from "./profile";
import AxiosInstance from '../api/axiosInstance';

import ReportChart from './reportChart'
import { Button, Modal } from "antd";

const App = ({ mode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportData , setReportData] = useState(null);

  const showModal = async () => {
    setIsModalOpen(true);
     const response = await AxiosInstance.get("/report");
    setReportData(response.data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
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
  closable={true}
  width={700}
  onOk={handleOk}
  onCancel={() => setIsModalOpen(false)}
  style={{ top: 20 }}
  bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
  footer={[
    <Button key="ok" type="primary" onClick={handleOk}>
      OK
    </Button>,
  ]}
>
  <ReportChart data={reportData} />
</Modal>

    </>
  );
};

export default App;
