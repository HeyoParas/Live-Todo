const assignModel = require("../models/assignedTaskSchema");
const taskModel = require("../models/taskSchema");
const userModel = require("../models/userSchema");
const {getUser} = require("./token");

// const getTasks = async (req, res) => {
//   console.log("inside /gettasks");
//   const user = getUser(req.cookies.mycookie);
//   try {
//     const userdata = await userModel.findById(user.id).populate([{path:"mytasks"},{path:"assignedTasks"}]); 
//     console.log("Tasks from DB ", tasks);
//     // Send tasks to the frontend
//     res.status(200).json({ mytasks:userdata.mytasks,assignedTasks:userdata.assignedTasks});
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//     res
//       .status(500)
//       .json({ error: "Internal server error. Please try again later." });
//   }
// };
// Add new task 

const addTask = async (req, res) => {
  const user = getUser(req.cookies.mycookie);
  const userId = user.id;
  const {
    tasktitle,
    taskDescription,
    section,
    currentProgress,
    priority,
  } = req.body;
  try {
    const newTask = new taskModel({
      tasktitle,
      taskDescription,
      section,
      progress:{currProgress:currentProgress},
      priority,
      userId
    });
    const savedTask = await newTask.save();
    if (savedTask) {
      try {
        await userModel.findByIdAndUpdate(
          { _id: user.id },
          {
            $push: { mytasks: savedTask._id },
          }
        );
        res.status(201).json(savedTask);
      } catch (err) {
        console.log("Error in id pushing in sectionModel", err);
      }
    }
    // res.status(201).json(savedTask);
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to add task" });
  }
};

// update existing task
const updateTask = async (req, res) => {
  console.log("am here");
  console.log(req.body);
  const {
    taskId,
    tasktitle,
    taskDescription,
    section,
    currentProgress,
    priority,
  } = req.body;
  try {
    const newTask = await taskModel.findByIdAndUpdate(
      taskId,
      {
        tasktitle,
        taskDescription,
        section,
        currentProgress,
        priority,
      },
      { new: true }
    );
    if (newTask) {
      res
        .status(200)
        .json({message: "Task updated successfully",success:true});
    }
    else{
      res.json({message:"Task updation failed!!",success:false});
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to update task",success:false});
  }
};

// disable the task 
const disableTask = async (req, res) => {
  const { taskId } = req.body;
  const user = getUser(req.cookies.mycookie);
  // console.log(req.body);
  if(user && taskId){
    try {
      const newTask = await taskModel.findByIdAndUpdate(taskId,{
        isDisable:true
      });
      const updateUser = await userModel.findByIdAndUpdate({_id:user.id},{
        $pull:{mytasks:taskId}
      });
      const assignedTasks = await assignModel.findOneAndUpdate({assignerId:user.id},{
        $pull:{tasks:taskId}
      })
      if(newTask && updateUser)
      res.status(200).json({ message: "Task deleted successfully",success:true });
      else
      res.json({ message: "Task deleted unsuccessfull",success:false});
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to delete task",success:false });
    }
  }
  if(!user){
    res.json({message:"Please Login first",success:false});
  }
  if(!taskId){
    res.json({message:"Please send a valid taskId",success:false});
  }
};

// add a new section to existing sections 
const addNewSection =async(req,res)=>{
  const user = getUser(req.cookies.mycookie);
  const {section}=req.body;
  try{
    const newSection = await userModel.findByIdAndUpdate({_id:user.id},{
      $addToSet:{sections:section}
    },{new:false})
    if(!newSection.sections.includes(section)){
      res.status(200).json({message:`${section} added successfully!!`});
    }
    else{
      res.status(200).json({message:`${section} already exists!!`});
    }
  }catch(err){
    console.log("Error adding new section: ",err);
    res.status(500).json({ error: "Failed to add section" });
  }
}
const getDataforAssignTasks =async (req,res)=>{
  const user = await getUser(req.cookies.mycookie);
  try{
    const otherUsers= await userModel.find({ _id: { $ne: user.id } });
    const tasksCanBeAssigned = await taskModel.find({userId:user.id});
    res.json({users:otherUsers,tasks:tasksCanBeAssigned})
  }catch(err){
    console.log("Error fetching data for assign Tasks: ",err);
  }
}

module.exports={
    addTask,addNewSection,updateTask,disableTask,getDataforAssignTasks
    // getTasks
}