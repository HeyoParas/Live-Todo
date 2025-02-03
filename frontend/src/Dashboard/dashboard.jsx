import React, { useState, useEffect, useContext } from 'react';
import Header from '../component/header';
import Navbar from '../component/Navbar';
import Todo from '../component/Todo';
import Inprogress from '../component/Inprogress';
import Done from '../component/Done';
import Drawer from '../component/Drawer';
// import { AuthContext } from '../AuthContext/authcontext';
import Shimmer from '../shimmer/shimmer';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import {createBrowserRouter} from "react-router-dom"
// import { RouterProvider } from 'react-router-dom';


const Dashboard = () => {
  // const { data, setData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [w, setWidth] = useState("20%");
  const [mode, setMode] = useState(false);

    useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },1500); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Shimmer />;
  }

  return  (
      <div className="flex h-screen">
      <div>
        <Drawer setWidth={setWidth} mode={mode} setMode={setMode} />
      </div>

      <div
        className="h-screen overflow-y-auto flex-grow"
        style={{
          marginLeft: w,
          background: mode ? "#ffffff" : "#2a2b2f",
          color: mode ? "#000000" : "#ffffff",
        }}
      >
        <Header mode={mode} />
        <Navbar mode={mode} /><hr />
        <div className="flex flex-col lg:flex-row justify-around items-center gap-x-4 h-[80%] m-3">
          {/* <div className="w-full lg:w-1/3 h-full m-2">
            <Todo mode={mode} data={data} setData={setData}/>
          </div>
          <div className="w-full lg:w-1/3 h-full m-2">
            <Inprogress mode={mode} data={data} />
          </div>
          <div className="w-full lg:w-1/3 h-full m-2">
            <Done mode={mode} data={data} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard
