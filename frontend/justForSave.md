  code from App.js
  
  // const [isAuthenticated, setIsAuthenticated] = useState(null); 

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:7000/auth/checkToken", {
  //         withCredentials: true, 
  //       });
  //       console.log("Authentication response:", response.data.success);
  //       setIsAuthenticated(response.data.success);
  //     } catch (error) {
  //       console.error("Error checking authentication:", error);
  //       setIsAuthenticated(false);
  //     }
  //   };
  
  //   verifyAuth();
  // }, []);


  {
    "_id": "67a2e503dc4975eb32488ccf",
    "userId": "67a232352b3642bc8f50f3ea",
    "tasktitle": "jb",
    "taskDescription": "jb",
    "section": "inProgress",
    "progress": {
        "currProgress": 1,
        "_id": "67a2e503dc4975eb32488cd0",
        "updatedAt": "2025-02-05T04:11:47.968Z"
    },
    "isDisable": false,
    "priority": 5,
    "assignDate": "2025-02-05T04:11:47.967Z",
    "dueDate": "2025-02-05T04:11:47.967Z",
    "comments": [],
    "createdAt": "2025-02-05T04:11:47.968Z",
    "updatedAt": "2025-02-05T04:11:47.968Z",
    "__v": 0
}

taskBox-color: #323740

const deleteTask = async (taskId) => {
    try {
        const response = await axios.post(`http://localhost:7000/deleteTask`,{ taskId });
        
        if (response.data.success) {
            message.success(response.data.message);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)); 
        } else {
            message.error("Failed to delete task!");
        }
    } catch (error) {
        console.error("Delete failed:", error);
        message.error("Error deleting task. Try again!");
    }
};

const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/updateTask",
      {
        taskId,
        ...updatedData, // Spread updated task data
      },
      { withCredentials: true } // Include credentials if needed
    );

    if (response.data.success) {
      message.success(response.data.message);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, ...updatedData } : task
        )
      );
    } else {
      message.error("Failed to update task!");
    }
  } catch (error) {
    console.error("Update failed:", error);
    message.error("Error updating task. Try again!");
  }
};

        task?.progress?.currProgress === 10
        ? "#78d700" // Green for 100% progress
        : task?.progress?.currProgress <= 3
        ? "#ff7979" // Light red for progress <= 3
        : "#ffa048", // Orange for progress > 3



