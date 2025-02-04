const express = require("express");

const router = express.Router();

const authController = require("../controllers/AuthController");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/Authenticate");
const reportController = require("../controllers/reportController");

router.get('/getUserData',authController.getUserData)
router.get('/auth/checkToken',authMiddleware.checkLoginStatus);
router.post("/ve    rifyEmail",authController.verifyEmail);
router.post("/signup",authController.signupUser);
router.post('/login',authMiddleware.isLogin,authController.loginUser);
router.post("/addTask",authMiddleware.verifyUser,taskController.addTask);
router.post("/updateTask",authMiddleware.verifyUser,taskController.updateTask);
router.post("/deleteTask",authMiddleware.verifyUser,taskController.disableTask)
router.post("/addSection",authMiddleware.verifyUser,taskController.addNewSection);

router.get("/report",authMiddleware.verifyUser,reportController.generateReport);

module.exports =router