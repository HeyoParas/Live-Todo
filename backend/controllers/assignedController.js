//Fetches all the tasks that are assigned to the current loggedin users.
const assignModel = require("../models/assignedTaskSchema");
const { getUser } = require("./token");

const getAssigned = async (req, res) => {
  try {
    let extractedEmail = (await getUser(req.cookies.mycookie)).email;
    const assignedTasks = await assignModel.find({ assignTo: extractedEmail });

    if (assignedTasks.length === 0) {
      return res.json({
        message: "No assigned tasks found for this user.",
        success: true,
      });
    }

    let assignedTaskscurrent = assignedTasks.map((assignment) => {
      return {
        assignerId: assignment.assignerId,
        assignTo: assignment.assignTo,
        tasks: assignment.tasks.map((task) => {
          return {
            taskId: task.taskId,
            assignDate: task.assignDate,
            dueDate: task.dueDate,
            currProgress: task.currProgress,
            status: task.status,
          };
        }),
      };
    });

    res.json(assignedTaskscurrent);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching assigned tasks.",
      error: error.message,
      success: true,
    });
  }
};

// get users you can assign task and also the tasks that can be assigned
const getDataforAssignTasks = async (req, res) => {
  const user = await getUser(req.cookies.mycookie);
  try {
    const otherUsers = await userModel.find({ _id: { $ne: user.id } });
    const tasksCanBeAssigned = await taskModel.find({ userId: user.id });
    res.json({ users: otherUsers, tasks: tasksCanBeAssigned, success: true });
  } catch (err) {
    console.log("Error fetching data for assign Tasks: ", err);
    res.json({
      success: false,
      message: "Error fetching data for assign Tasks",
    });
  }
};

// assignTask to user
const assignTask = async (req, res) => {
  const { email, taskId, assignDate, dueDate, currProgress } = req.body;
  if (!verifydate(assignDate, dueDate)) {
    const user = await getUser(req.cookies.mycookie);
    if (user) {
      try {
        const dataExists = await assignModel.findOne({assignerId:user.id,assignTo:email});
        if(dataExists){
          const updateData = await assignModel.findByIdAndUpdate({_id:dataExists._id},{
            $addToSet:{tasks:{email,taskId,assignDate,dueDate,currProgress}}
          })
          if(updateData.nModified==0){
            res.json({message:"Task Already assigned!!",success:false})
          }
          else{
          res.json({message:"Task Assigned Successfully!!",success:true})
          }
        }else{
        const newAssignTask = new assignModel({
          assignerId: user.id,
          assignTo: email,
          $push: { tasks: { taskId, assignDate, dueDate, currProgress } },
        });
        await newAssignTask.save();
        res.json({message:"Task Assigned Successfully!!",success:true});
      }
      } catch (error) {
        console.log("Error Assigning Tasks", error);
        res.json({message:"Error Assigning Tasks",success:false});
      }
    } else {
      res.json({ message: "Please Login First", success: false });
    }
  }
};
module.exports = { getAssigned, getDataforAssignTasks, assignTask };
