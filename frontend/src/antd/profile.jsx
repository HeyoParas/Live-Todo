import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import camera from "../assets/camera.svg"
import {useAuth } from '../context/AuthContext';

  const ProfileComponent = ({closeModal}) => {
  const {userData} = useAuth();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showDialog, setShowDialog] = useState(true);
  const videoRef = useRef(null);


  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Open Camera
  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera.");
    }
  };

  // Capture Image from Camera
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    // Set a fixed width & height for image
    const fixedWidth = 500;
    const fixedHeight = 500;

    canvas.width = fixedWidth;
    canvas.height = fixedHeight;

    // Draw image with fixed dimensions
    ctx.drawImage(video, 0, 0, fixedWidth, fixedHeight);
    const imageData = canvas.toDataURL("image/jpeg");

    setCapturedImage(imageData);
    setValue("image", imageData);
    closeCamera();
  };

  // Close Camera
  const closeCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  // Handle Image Upload from File
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        resizeImage(reader.result, 150, 150, (resizedImage) => {
          setCapturedImage(resizedImage);
          setValue("image", resizedImage);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Resize Image Function
  const resizeImage = (imageSrc, width, height, callback) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const resizedImage = canvas.toDataURL("image/jpeg");
      callback(resizedImage);
    };
  };

  // Form Submission
  const onSubmit = async (data) => {
    console.log(data)
    // try {
    //   await axios.post("/api/update-username", data);
    //   alert("Profile updated successfully!");
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    // }
  };

  // // Close Dialog
  // const closeDialog = () => {
  //   setShowDialog(false);
  // };

  // handle Report
  const handleReport = async () => {

    const response = await axios.get('http://localhost:7000/report',{
      withCredentials: true
    });
    console.log("report response:",response.data);
    closeModal();
  }

  return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Profile</h2>
          
        </div>

        {/* Profile Picture */}
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={capturedImage || "/default-avatar.png"}
              alt = {userData.username}
              className="w-[150px] h-[150px] rounded-full mx-auto object-cover shadow-lg"
            />
            <button
              className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full"
              onClick={openCamera}
            >
            <img src={camera} alt="camera" 
             style={{
              filter: "invert(1) brightness(.8)",
            }}/>
            </button>
          </div>
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700">Username:</label>
            <input
  type="text"
  defaultValue={userData.username} // ✅ Use defaultValue instead of value
  {...register("username", {
    required: "Username is required",
    minLength: { value: 3, message: "At least 3 characters" },
  })}
  className="border border-gray-300 rounded p-2 w-full text-black"
/>

            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-4 block w-full  bg-slate-600 text-white py-2 rounded hover:bg-slate-500">
            Save Profile
          </button>
        </form>

        {/* My Reports Button */}
        <button className="block w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-500" onClick={handleReport}>
          My Reports
        </button>

        {/* Camera Modal */}
        {showCamera && (
          <div className="text-center">
            <video ref={videoRef} className="mx-auto border border-gray-300 rounded w-[300px] h-[200px] object-cover" />
            <div className="space-x-4 mt-2">
              <button onClick={captureImage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Capture
              </button>
              <button onClick={closeCamera} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
};

export default ProfileComponent;
