import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from "react-router-dom";
import SignupScreen from './signupScreen';
import axios from 'axios';
import { message } from 'antd';

const OtpScreen = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state?.signupData;

  const [timer, setTimer] = useState(30);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (data) => {
    try {
      const otpNumber = parseInt(Object.values(data).join(""), 10);
      const combinedData = { ...signupData, otpNumber };

      const response = await axios.post('http://localhost:7000/signup', combinedData);
      if (response.data.success) {
        message.success(response.data.message);
        Navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    }
  };

  const handleResend = async () => {
    try {
      setTimer(30);

      if (!signupData) {
        message.warning("Signup First");
        await new Promise((resolve) => setTimeout(resolve, 2500));
      
        Navigate("/signup")
      }
      

      const response = await axios.post('http://localhost:7000/verifyEmail', signupData);
      console.log(response.data)
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        console.log("hii")
        message.error(response.data.message);
      }

    } catch (error) {
      console.log("hu")
      message.error(error);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    
    // Sirf ek number allow karega aur next input pe focus karega
    if (/^\d$/.test(value)) {
      setValue(`digit${index}`, value); // React Hook Form ke state ko update karna
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); // Next input pe focus karega
      }
    } else {
      setValue(`digit${index}`, ""); // Agar valid nahi hai toh empty kar dega
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus(); // Pichle input pe focus karega
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-40">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Enter Verification Code
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We have sent a verification code to your email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between gap-2">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                {...register(`digit${index}`, {
                  required: 'Required',
                  pattern: {
                    value: /^[0-9]$/, 
                    message: 'Must be a number'
                  }
                })}
                className="w-12 h-12 text-center text-xl border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => inputRefs.current[index] = el}
              />
            ))}
          </div>

          {Object.keys(errors).length > 0 && (
            <p className="text-red-500 text-sm text-center">
              Please fill all digits correctly
            </p>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Verify OTP
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Didn't receive code?{' '}
            <button 
              className={`text-blue-500 hover:text-blue-600 font-medium ${timer > 0 ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={handleResend}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
