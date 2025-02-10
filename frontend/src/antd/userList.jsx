import React, { useState } from "react";
import { Dropdown, Space, Spin, message, Popconfirm } from "antd";
import { useAuth } from "../context/AuthContext";
import users from "../assets/users.svg";
import AxiosInstance from '../api/axiosInstance';

const UserList = ({ mode }) => {
  const { userList, setUserList } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to toggle dropdown

  const handleClick = async () => {
    console.log("am here");
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/getUserList");
      console.log("userList", response.data);
      if (response.data.success) {
        setUserList(response.data.users || []);
        setOpen((prev) => !prev); // Toggle dropdown on click
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = (userName) => {
    console.log(`Assigning task to ${userName}`);
    // Your task assignment logic here
    message.success(`Task assigned to ${userName}`);
  };

  const items = userList.map((user, index) => ({
    key: index,
    label: (
      <Popconfirm
        title={`Assign task to ${user.username}?`}
        description="Are you sure to assign this task?"
        onConfirm={() => handleAssignTask(user.username)}
        onCancel={() => message.error("Task assignment canceled")}
        okText="Yes"
        cancelText="No"
        placement="bottomLeft"
      >
        <span>{user.username}</span>
      </Popconfirm>
    ),
  }));

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
          // open={open} // Control dropdown manually
          // onOpenChange={setOpen}
          trigger={["click"]}
        >
          <button
            className="rounded-full hover: cursor-pointer"
            onClick={handleClick}
          >
            {loading ? (
              <Spin />
            ) : (
              <img
                src={users}
                alt="comment"
                className="w-5 h-5"
                style={{ filter: mode ? "none" : "invert(1)" }}
              />
            )}
          </button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default UserList;
