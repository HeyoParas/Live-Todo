import React from "react";
import cycle from "../assets/cycle.svg"
import Login from "./loginScreen"
import { useForm } from "react-hook-form";

const mainScreen = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      console.log("signup", data);
    };
  
  return (
    <>
      <div className="flex">
        <div className="  w-full">
          <div className=" m-3 p-5 ">
            <h3 className="m-3 font-bold text-xl mb-[10%]">Digital</h3>
            <h1 className="m-3 font-bold text-4xl ">Todo - Get It Done </h1>
          </div>

          <div className="w-[60%] rounded-lg m-10">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome back! Please signup to your account.
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label
                className="block text-gray-600 font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className={`w-[90%] border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.username.message}
                </p>
              )}
            </div> 

            <div className="mb-4">
            <label
              className="block text-gray-600 font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-[90%] border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="hakeem@digital.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>


          <div className="mb-4">
            <label
              className="block text-gray-600 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-[90%] border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long", }, })} /> {errors.password && ( <p className="text-red-500 text-sm mt-2">{errors.password.message}</p> )} </div>

<div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
         SignUp
        </button>
        <button
          type="button"
          className="text-blue-500 font-medium px-4 py-2 border border-blue-500 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
      </div>

        </form>
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
