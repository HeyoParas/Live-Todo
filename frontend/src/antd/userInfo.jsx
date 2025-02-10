import React, { useState } from "react";
import users from "../assets/users.svg";
import { Button, Modal, Space, List } from "antd";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const App = ({ mode }) => {
  const { userList,setUserList } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/getUserList", {
        withCredentials: true,
      });
      console.log("userList", response.data);
      setUserList(response.data); // Save the user list
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Space wrap>
      <button
        className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 p-1"
        onClick={handleClick}
      >
        <img
          src={users}
          alt="users"
          className="w-5 h-5"
          style={{ filter: mode ? "none" : "invert(1)" }}
        />
      </button>

      {/* Modal to display the user list */}
      <Modal
        title="User List"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {loading ? (
          <p>Loading...</p>
        ) : userList.length > 0 ? (
          <List
            dataSource={userList}
            renderItem={(user) => (
              <List.Item>
                <strong>{user.name}</strong> - {user.email}
              </List.Item>
            )}
          />
        ) : (
          <p>No users found.</p>
        )}
      </Modal>
    </Space>
  );
};

export default App;
