import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:7000"); // Connect to backend

const Notification = ({ userId }) => {
  useEffect(() => {
    if (userId) {
      socket.emit("LogginUser", userId); // Register user with server
    }

    socket.on("taskAssigned", (data) => {
      showNotification(data);
    });

    return () => {
      socket.off("taskAssigned");
    };
  }, [userId]);

  const showNotification = (data) => {
    toast.info(
      <div>
        <strong>New Task Assigned</strong>
        <p><b>Task:</b> {data.taskTitle}</p>
        <p><b>Assigned By:</b> {data.assignerEmail}</p>
      </div>,
      { position: "top-right", autoClose: 5000 }
    );
  };

  return null; // No UI element, just handling notifications
};

export default Notification;
