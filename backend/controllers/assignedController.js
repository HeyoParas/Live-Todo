//Fetches all the tasks that are assigned to the current loggedin users.
const assignModel = require("../models/assignedTaskSchema");
const { getUser } = require("./token");

const getAssigned = async (req, res) => {
  try {
    let extractedEmail = (await getUser(req.cookies.mycookie)).email;
    const assignedTasks = await assignModel.find({ assignTo: extractedEmail });

    if (assignedTasks.length === 0) {
      return res.json({ message: "No assigned tasks found for this user." ,
                        success: true,
      });
    }   

    let assignedTaskscurrent = assignedTasks.map(assignment => {
      return {
        assignerId: assignment.assignerId,
        assignTo: assignment.assignTo,
        tasks: assignment.tasks.map(task => {
          return {
            taskId: task.taskId,
            assignDate: task.assignDate,
            dueDate: task.dueDate,
            currProgress: task.currProgress,
            status: task.status
          };
        })
      };
    });

    res.json(assignedTaskscurrent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching assigned tasks.", error: error.message ,success: true });
  }
};

module.exports = { getAssigned };