const express = require("express");

const router = express.Router();

const authController = require("../controllers/AuthController");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/Authenticate");
const reportController = require("../controllers/reportController");
const assignedController = require("../controllers/assignedController");

router.get('/getUserData',authController.getUserData)
router.get('/auth/checkToken',authMiddleware.checkLoginStatus);
router.post("/verifyEmail",authController.verifyEmail);
router.post("/signup",authController.signupUser);
router.post('/login',authMiddleware.isLogin,authController.loginUser); 
router.post("/addTask",authMiddleware.verifyUser,taskController.addTask);
router.post("/updateTask",authMiddleware.verifyUser,taskController.updateTask);
router.post("/deleteTask",authMiddleware.verifyUser,taskController.disableTask)
router.post("/addSection",authMiddleware.verifyUser,taskController.addNewSection);
router.post("/logout",authController.logoutUser );   

router.post("/assignTask",assignedController.assignTask);

router.get("/report",authMiddleware.verifyUser,reportController.generateReport);
router.patch("/updateSection",authMiddleware.verifyUser,taskController.updateSection);
router.get("/assignedtask",authMiddleware.verifyUser,assignedController.getAssigned);
// router.get("/getUserList",authMiddleware.verifyUser,assignedController.getUserList);
module.exports =router  