import React from 'react';
import "../app.css";
import exit from '../assets/exit.svg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';

const logOut = () => {
  const handleConfirm = () => {
    console.log("User confirmed logout");
    message.success("Logged out successfully!"); 
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
