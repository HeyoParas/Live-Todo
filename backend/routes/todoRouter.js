const express = require("express");

const router = express.Router();

const authController = require("../controllers/AuthController");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/Authenticate");
const reportController = require("../controllers/reportController");
const {authMiddlewareForToken} = require("../controllers/token");

router.get('/getUserData',authMiddlewareForToken,authController.getUserData)
router.get('/auth/checkToken',authMiddleware.checkLoginStatus);
router.post("/verifyEmail",authController.verifyEmail);
router.post("/signup",authController.signupUser);
router.post('/login',authMiddlewareForToken,authMiddleware.isLogin,authController.loginUser); 
router.post("/addTask",authMiddlewareForToken,authMiddleware.verifyUser,taskController.addTask);
router.post("/updateTask",authMiddlewareForToken,authMiddleware.verifyUser,taskController.updateTask);
router.post("/deleteTask",authMiddlewareForToken,authMiddleware.verifyUser,taskController.disableTask)
router.post("/addSection",authMiddlewareForToken,authMiddleware.verifyUser,taskController.addNewSection);


router.get("/report",authMiddleware.verifyUser,reportController.generateReport);

module.exports =router