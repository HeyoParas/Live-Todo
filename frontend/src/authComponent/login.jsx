import React from 'react'
import { useForm } from "react-hook-form"

const login = () => {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" >
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
                Welcome back! Please login to your account.
            </h1>

             {/* Form */}
             <form>
                {/* Email section */}
                
                {/* Password section */}
             </form>
        </div>
        
    </div>
  );

}

export default login