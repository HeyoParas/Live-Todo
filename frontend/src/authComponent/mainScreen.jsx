import React from "react";
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

          <div>{/* <component/> */}</div>
          <div className="flex gap-x-5 m-12">
            <div>
              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:from-blue-600">
                <a href="">Login</a>
              </button>
            </div>
            <div>
              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:from-blue-600">
                <a href="">Signup</a>
              </button>
            </div>
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
