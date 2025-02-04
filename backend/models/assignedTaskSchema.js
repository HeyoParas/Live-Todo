const mongoose = require("mongoose");
const assignTasks = new mongoose.Schema({
  assignerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  assignDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  tasks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks",
  }]
});
const assignModel = mongoose.model("assignTasks", assignTasks);
module.exports = assignModel;

//   try {
//     const currentDate = moment();
//     const users = await userModel.find().populate("mytasks");

//     let report = {
//       completed: 0,
//       notStarted: 0,
//       inProgress: 0,
//       dueTasks: 0,
//       categoryCount: {},
//       mostCompletedCategory: "",
//     };

//     users.forEach((user) => {
//       user.mytasks.forEach((task) => {
//         const progress = task.progress.currProgress;

//         if (progress === 10) {
//           report.completed += 1;
//         } else if (progress === 0) {
//           report.notStarted += 1;
//         } else if (progress >= 1 && progress <= 9) {
//           report.inProgress += 1;
//         }

//         if (moment(task.dueDate).isBefore(currentDate)) {
//           report.dueTasks += 1;
//         }

//         const category = task.section;
//         if (!report.categoryCount[category]) {
//           report.categoryCount[category] = 0;
//         }
//         report.categoryCount[category] += 1;

//         if (
//           progress === 10 &&
//           (!report.mostCompletedCategory ||
//             report.categoryCount[category] > report.categoryCount[report.mostCompletedCategory])
//         ) {
//           report.mostCompletedCategory = category;
//         }
//       });
//     });

//     return res.status(200).json(report);
//   } catch (error) {
//     console.log("Error generating report:", error);
//     return res.status(500).json({ message: "Error generating the report" });
//   }