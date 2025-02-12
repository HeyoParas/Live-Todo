import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

// Establish WebSocket Connection
const socket = io("http://localhost:7000", {
<<<<<<< HEAD
  withCredentials: true, // Ensures authentication if needed
  reconnectionAttempts: 5, // Tries to reconnect 5 times
  transports: ["websocket"], // Ensures WebSocket transport is used
=======
  withCredentials: true,
  reconnectionAttempts: 5,
  transports: ["websocket"],
>>>>>>> 16cf041b96126686e18feff0dc8a35414a49823c
});

const Notification = ({ userId }) => {
  useEffect(() => {
    if (!userId) return;
<<<<<<< HEAD
=======

    socket.emit("LogginUser", userId); // Register user with backend
>>>>>>> 16cf041b96126686e18feff0dc8a35414a49823c

    // Log socket connection
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("LogginUser", userId); // Register user
    });

    // Listen for taskAssigned event
    socket.on("taskAssigned", (data) => {
      console.log("New Task Assigned:", data);
      showNotification(data);
    });

    // Cleanup function
    return () => {
      socket.off("taskAssigned"); // Remove event listener
      socket.off("connect"); // Remove connection listener
    };
  }, [userId]); // Runs only when userId changes

  const showNotification = (data) => {
    toast.info(
      <div>
        <strong>New Task Assigned</strong>
        <p>
          <b>Task:</b> {data.taskTitle}
        </p>
        <p>
          <b>Assigned By:</b> {data.assignerEmail}
        </p>
      </div>,
      { position: "top-right", autoClose: 5000 }
    );
  };

  return null; // No UI, just handling notifications
};

export default Notification;
