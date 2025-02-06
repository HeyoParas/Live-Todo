import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { Camera, FileText } from "lucide-react";

export default function ProfileCard() {
  const [username, setUsername] = useState("John Doe");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-b shadow-lg rounded-2xl w-80 relative">
      {/* Profile Picture */}
      <div className="relative w-24 h-24">
        <img
          src={profilePic}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
        <label className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
          <Camera className="w-5 h-5 text-white" />
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* Username */}
      <h2 className="text-xl font-semibold mt-4">{username}</h2>
      
      {/* Username Input */}
      <input
        type="text"
        className="mt-2 p-2 border rounded-lg w-full text-center"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* My Reports Button */}
      <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-blue-600 text-white p-2 rounded-lg">
        <FileText className="w-5 h-5" /> My Reports
      </button>
    </div>
  );
}
