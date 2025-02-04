const taskModel = require("../models/taskSchema");
const assignModel = require("../models/assignedTaskSchema");
const { getUser } = require("./token");
const moment = require("moment");

const generateReport = async (req, res) => {
  try {
    let extractedEmail = (await getUser(req.cookies.mycookie)).email;
    console.log(`Report for ${extractedEmail} being generated, please wait...`);

    // Find the user
    const user = await userModel.findOne({ email: extractedEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch all tasks associated with the user
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
      // Track each section separately
      if (task.section in report.categoryCount) {
        report.categoryCount[task.section]++;
      } else {
        report.categoryCount[task.section] = 1;
      }

      // Track progress-based counts
      if (task.section === "completed") report.completed++;
      if (task.section === "todo") report.notStarted++;
      if (task.section === "inProgress") report.inProgress++;

      // Check for overdue tasks only if progress is 10 (completed)
      if (task.progress.currProgress === 10 && new Date(task.dueDate) < new Date(task.progress.updatedAt)) {
        report.dueTasks++;
      }

      // Track completion per category
      if (!(task.section in categoryCompletion)) {
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
