const taskModel = require("../models/taskSchema");
const assignModel = require("../models/assignSchema");
const { getUser } = require("./token");
const moment = require("moment");

const generateReport = async (req, res) => {
  try {
    let extractedEmail = (await getUser(req.cookies.mycookie)).email;
    console.log(`Report for ${extractedEmail} being generated, please wait...`);

    // Find the user
    const user = await userModel.findOne({ email: extractedEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch user's tasks
    const tasks = await taskModel.find({ userId: user._id });
    const assignedTasks = await assignModel.find({ assignerId: user._id }).populate("tasks");

    let report = {
      completed: 0,
      notStarted: 0,
      inProgress: 0,
      dueTasks: 0,
      categoryCount: {},
      mostCompletedCategory: "",
      assignedTotal: 0,
      assignedCompleted: 0,
    };

    // Count tasks based on status and category
    let categoryCompletion = {};
    tasks.forEach((task) => {
      if (task.section === "completed") report.completed++;
      else if (task.section === "todo") report.notStarted++;
      else if (task.section === "inProgress") report.inProgress++;

      // Check for overdue tasks only if progress is 10 (completed)
      if (task.progress.currProgress === 10 && new Date(task.dueDate) < new Date(task.progress.updatedAt)) {
        report.dueTasks++;
      }

      // Count categories
      if (!report.categoryCount[task.section]) {
        report.categoryCount[task.section] = 0;
      }
      report.categoryCount[task.section]++;

      // Track completion per category
      if (!categoryCompletion[task.section]) {
        categoryCompletion[task.section] = 0;
      }
      if (task.section === "completed") {
        categoryCompletion[task.section]++;
      }
    });

    // Count assigned tasks
    assignedTasks.forEach((assignedTask) => {
      report.assignedTotal += assignedTask.tasks.length;
      assignedTask.tasks.forEach((task) => {
        if (task.section === "completed") report.assignedCompleted++;
      });
    });

    // Determine most completed category
    report.mostCompletedCategory = Object.keys(categoryCompletion).reduce((a, b) =>
      categoryCompletion[a] > categoryCompletion[b] ? a : b, "");

    res.json(report);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { generateReport };
