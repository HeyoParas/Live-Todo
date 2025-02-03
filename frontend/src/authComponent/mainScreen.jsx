import React from "react";
import Login from './login'
import cycle from "../assets/cycle.svg"

const mainScreen = () => {
  return (
    <>
      <div className="flex">
        <div className="  w-full">
          <div className=" m-3 p-5 ">
            <h3 className="m-3 font-bold text-xl mb-[10%]">Digital</h3>
            <h1 className="m-3 font-bold text-4xl ">Todo Management </h1>
          </div>

          <div className="m-3 p-5 h-full">
            <Login/>
          </div>

        </div>

        <div className=" w-full  flex flex-col  ">
          <div className="flex gap-x-10 justify-center mt-10">
          <div className="mt-5"><a href="#" className="text-2xl">home</a></div>
          <div className="mt-5"><a href="#" className="text-2xl">home</a></div>
          <div className="mt-5"><a href="#" className="text-2xl">home</a></div>
          <div className="mt-5"><a href="#" className="text-2xl">home</a></div>
          </div>
        <div className="mt-10">
          <div><img src={cycle} alt="cycle" /></div>
        </div>
        </div>
      </div>
    </>
  );
};

export default mainScreen;
