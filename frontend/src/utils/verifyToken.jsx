const verifyToken = async () => {
    try {
      const response = await fetch("http://localhost:7000/auth/checkToken", {
        method: "GET",
        credentials: "include", 
        withCredentials: true,
      });
      const data = await response.json(); 
      console.log("here is data",data)
      return data.authenticated === true;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return false; 
    }
  };
  
  
  export default verifyToken;