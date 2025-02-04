import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SignupScreen from './signupScreen'
import axios from 'axios'

const OtpScreen = () => {
  const [timer, setTimer] = useState(30);
  const { register, handleSubmit, formState: { errors } } = useForm();

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
    console.log(data);
  

    try {
      console.log(data);
  
      const sessionData = JSON.parse(sessionStorage.getItem('signupData'));
  
      const otpNumber = parseInt(Object.values(data).join(""), 10);
      const combinedData = { ...sessionData, otpNumber };
  
      console.log("Combined Data:", combinedData);
  
      const response = await axios.post('http://localhost:7000/signup', combinedData);
      console.log("Response:", response.data)
      if (response.data.success) {
        Navigate("/login");
      } else {
        message.error("Invalid Otp");
      }
  
    } catch (error) {
      console.error("Error during the request:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  const handleResend = async () => {
    try {
      setTimer(30); 
  
      const sessionData = JSON.parse(sessionStorage.getItem('signupData'));
  
      if (!sessionData) {
        message.error("Signup First");

        return <SignupScreen/>
      }
  
      console.log("Resending email:", sessionData.email);
      const response = await axios.post('http://localhost:7000/verifyEmail', sessionData.email);
  
      if (response.data.success) {
        message.success("OTP Resent to your Email");
      } else {
        message.error("Failed to resend OTP. Please try again.");
      }
  
    } catch (error) {
      console.error("Error while resending OTP:", error);
      message.error("An error occurred. Please try again later.");
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
