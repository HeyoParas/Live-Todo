import React from 'react';
import "../app.css";
import exit from '../assets/exit.svg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";

const logOut = () => {
    const Navigate = useNavigate();

  const handleConfirm = async () => {
    console.log("User confirmed logout");
    try {
        const response = await axios.get("http://localhost:7000/logout", {
          withCredentials: true, 
        });
  
        console.log("Logout successful:", response.data);
        message.success("Logged out successfully!"); 
        Navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        message.error("Logout failed! Please try again."); 
      }
  };

  const handleCancel = () => {
    console.log("User canceled logout");
    message.info("Logout canceled");  
  };

  return (
    <Popconfirm
      title="LOG OUT"
      placement="right"
      description="Are you sure you want to LOG OUT?"
      onConfirm={handleConfirm}  
      onCancel={handleCancel}    
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    >
      <Button className="custom-button">
        <img src={exit} alt="Logout" />
      </Button>
    </Popconfirm>
  );
};

export default logOut;
