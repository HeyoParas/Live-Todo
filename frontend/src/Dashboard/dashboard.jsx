import React, { useState, useEffect } from "react";
import AxiosInstance from "../api/axiosInstance";
import Header from "../component/header";
import Navbar from "../component/Navbar";
import TaskSection from "../component/taskSection";
import Drawer from "../component/Drawer";
import Shimmer from "../shimmer/shimmer";
import { useAuth } from "../context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { message } from "antd";
import MyTasks from './myTasks';
import AssignedTasks from './assignTasks';

const Dashboard = () => {
  const { userData, setUserData, tasks, setTasks } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [w, setWidth] = useState("20%");
  const [mode, setMode] = useState(false);
  const [isMyTaskOpen, setIsMyTaskOpen] = useState(true);
  const [isAssignedTaskOpen, setIsAssignedTaskOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/getUserData");
        const assignedTaskResponse = await AxiosInstance.get("/assignedtask");
        console.log("assignedTaskResponse: ",assignedTaskResponse.data);
        console.log("response from backend:", response.data);
        if (response.data.success) {
          setUserData(response.data.userdata);
          setTasks(response.data.userdata.mytasks);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        // console.error("Error fetching data:", err);
        message.error(error.message || "An error occurred");
        // setError("Failed to load tasks! Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Shimmer />;
  }

  const handleMyTaskOpen = () => {
    setIsMyTaskOpen(true);
    setIsAssignedTaskOpen(false);
  };

  const handleAssingedTaskOpen = () => {
    setIsAssignedTaskOpen(true);
    setIsMyTaskOpen(false);
  };

  const onDragEnd = async (result) => {
    //"If it is not dropped anywhere, do nothing."
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const currentTask = tasks.filter((task) => {
      if (task._id == draggableId) {
        return task;
      }
    });
    // console.log("currentTask: ", currentTask);
    // console.log("draggableId: ", draggableId);
    // console.log("destination.droppableId: ", destination.droppableId);

    try {
      const obj = {
        taskId: draggableId,
        section: destination.droppableId,
      };

      if (destination.droppableId == currentTask[0].section) {
        return message.warning("Cannot update in same section");
      }

      if (currentTask[0].section == "completed") {
        return message.warning("Cannot change section of completed task");
      }

      const response = await AxiosInstance.patch("/updateSection", obj);
      console.log("drag response", response.data);
      if (response.data.success) {
        message.success("Task " + response?.data?.message);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === draggableId
              ? { ...task, ...response.data.updatedTask } // Update all fields
              : task
          )
        );
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error updating task section:", error);
      message.error(error.message || "An error occurred");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen w-full">
        <div>
          <Drawer setWidth={setWidth} mode={mode} setMode={setMode} />
        </div>
        {/* main section */}
        <div
          className="h-full overflow-y-none scrollbar-hide"
          style={{
            marginLeft: w,
            width: `calc(96% - ${w})`,
            background: "#2a2b2f",
            color: "#ffffff",
          }}>
          <Header mode={mode} name={userData.username} />
          {/* <Navbar mode={mode} /> */}
          <Navbar
            mode={mode}
            handleMyTaskOpen={handleMyTaskOpen}
            handleAssingedTaskOpen={handleAssingedTaskOpen}
          />
          {/* <hr className=""/> */}
          <hr
            className={`${
              mode ? "border-gray-300 border-2" : "border-[#3f4044] border-2"
            }`}
          />

          {isMyTaskOpen &&  <MyTasks mode={mode} data={userData.sections} />
                  //     <div
                  //     className="h-[84%] overflow-x-auto flex items-center justify-start gap-3 flex-nowrap w-full scrollbar-hide p-3"
                  //     style={{
                  //       background: mode ? "#ffffff" : "#2a2b2f",
                  //     }}>
                  //     {userData.sections.map((elem, index) => (
                  //       <TaskSection key={index} sectionName={elem} mode={mode} />
                  //     ))}
                  //   </div>
                  // )
          }

          {isAssignedTaskOpen && <AssignedTasks mode={mode} />}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
