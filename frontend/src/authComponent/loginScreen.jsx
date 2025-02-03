import React from "react";
import cycle from "../assets/cycle.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message } from "antd";
// import Link from "react-router-dom";

const loginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("login Data:", data);
    try {
      console.log("login", data);
  
      const response = await axios.post('http://localhost:7000/login', data);
  
      console.log("Response from backend:", response.data);
  
      if (response.data.success) {  
        Navigate("/dashboard");
      } else {
        message.error("Invaild credentials");
      }
    } catch (error) {
      message.error("Error during login", error);
    }

  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center overflow-hidden p-4">
      <div className="flex w-full h-full shadow-lg m-[5%] items-center justify-center">
        {/* Left Section */}
        <div className="w-full">
          <div className="m-3 p-5">
            <h3 className="m-3 font-bold text-xl mb-[10%]">Digital</h3>
            <h1 className="m-3 font-bold text-4xl">Todo - Get It Done</h1>
          </div>

          <div className="w-[60%] rounded-lg m-10">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome back! Please signup to your account.
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="email">
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
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="password">
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
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Login
                </button>
                <button
                  type="button"
                  className="text-blue-500 font-medium px-4 py-2 border border-blue-500 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  signup
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full flex flex-col bg-slate-100">
          {/* Navigation Links */}
          <div className="flex gap-x-10 justify-center mt-10">
            {["Home", "About", "Services", "Contact"].map((link, index) => (
              <div key={index} className="mt-5">
                <a href="#" className="text-2xl">
                  {link}
                </a>
              </div>
            ))}
          </div>

          {/* Image */}

          <div className="mt-10 flex justify-center">
            <img
              src={cycle}
              alt="cycle"
              className="s-screen"
            />
          </div>
          {/* <div className="mt-10">
            <img src={cycle} alt="cycle" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default loginScreen;
