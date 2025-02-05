import React from 'react';
import "../app.css";
import exit from '../assets/exit.svg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const logOut = () => {
    const { setIsAuthenticated } = useAuth();
    const Navigate = useNavigate();

    const handleConfirm = async () => {

      try {
          const response = await axios.post("http://localhost:7000/logout", {}, {
              withCredentials: true,
          });
          
          if (response.data.success) {
              message.success(response.data.message);
              setIsAuthenticated(false);
              Navigate("/login");
          } else {
              message.error("Please Try Again");
          }
  
      } catch (error) {
        console.log("6")
          console.error("Logout failed:", error.response?.data || error.message);
          // message.error("Logout failed! Please try again.");
      }
  };

  const handleCancel = () => {
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
