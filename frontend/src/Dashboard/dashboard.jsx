import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../component/header";
import Navbar from "../component/Navbar";
import TaskSection from "../component/taskSection";
import Drawer from "../component/Drawer";
import Shimmer from "../shimmer/shimmer";
import { useAuth } from "../context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Dashboard = () => {
  const { userData, setUserData, setTasks } = useAuth();
  const [reTrigger, setReTrigger] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [w, setWidth] = useState("20%");
  const [mode, setMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/getUserData", {
          withCredentials: true,
        });
        // console.log("response from backend:",response.data);
        setUserData(response.data.userdata);
        setTasks(response.data.userdata.mytasks);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load tasks! Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reTrigger]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Shimmer />;
  }

  const onDragEnd = async (result) => {
    if (!result.destination) return; // Agar kahi drop nahi hua toh kuch nahi karna

    const { source, destination, draggableId } = result;

    // Backend me task ka section update karna
    try {
      // await axios.post("http://localhost:7000/updateTaskSection", {
      //   taskId: draggableId,
      //   newSection: destination.droppableId,
      // });
      console.log("draggableId: ", draggableId);
      console.log("destination.droppableId: ", destination.droppableId);

      setReTrigger((prev) => !prev); // UI refresh karne ke liye
    } catch (error) {
      console.error("Error updating task section:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <div>
          <Drawer setWidth={setWidth} mode={mode} setMode={setMode} />
        </div>

        <div
          className="h-screen overflow-y-auto flex-grow"
          style={{
            marginLeft: w,
            background: mode ? "#ffffff" : "#2a2b2f",
            color: mode ? "#2a2b2f" : "#ffffff",
          }}>
          <Header mode={mode} name={userData.username} />
          {/* <Navbar mode={mode} /> */}
          <Navbar mode={mode} reTrigger={setReTrigger} />
          {/* <hr className=""/> */}
          <hr
            className={`${
              mode ? "border-gray-300 border-2" : "border-[#3f4044] border-2"
            }`}
          />

          <div className="h-[85%] overflow-x-auto flex items-center justify-start gap-3 flex-nowrap w-full scrollbar-hide p-5">
            {userData.sections.map((elem, index) => (
        <TaskSection key={index} sectionName={elem} mode={mode} reTrigger={setReTrigger}/>
        ))} 
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
