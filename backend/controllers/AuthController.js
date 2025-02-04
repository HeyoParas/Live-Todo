const { comparePassword, bcryptPassword } = require("./bcrypt");
const { makeToken,getUser } = require("./token");
const userModel = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
const assignedTasks = require("../models/assignedTaskSchema");
const { sendEmail } = require("./MailAuth");
const validator = require("validator");
const mongoose = require("mongoose");

const verifyEmail = async (req, res) => {
  console.log("/verify",req.body);
  const { email } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    console.log("User already exists!");
    return res.json({ message: "User already exists" ,success:false});
  }
  const otp = await sendEmail(email);
  console.log(otp);
  try {
    const otpStored = new otpModel({
      email: email,
      otp: otp,
    });
    await otpStored.save();
    console.log(otpStored);
    res.json({ message: "Otp Sent", success: true });
  } catch (error) {
    console.log("Error saving Otp: ", error);
    res.status(500).json({ message: "Otp Sent Failed", success: false });
  }
};

const loginUser = async (req, res) => {
  console.log("inside /login");
  if (validator.isEmail(req.body.email)) {
    try {
      let user = await userModel
        .findOne({ email: req.body.email })
        .populate([{ path: "mytasks", match: { isDisable: false } }]); // Only populate `mytasks` for now.

      // Check if assignTasks model is available
      if (mongoose.modelNames().includes('assignTasks')) {
        user = await userModel
          .findOne({ email: req.body.email })
          .populate([
            { path: "mytasks", match: { isDisable: false } },
            { path: "assignedTasks", match: { isDisable: false } } // Populate assignTasks if available
          ]);
      }

      if (user) {
        let check = await comparePassword(req.body.password, user.password); //compare bcrypt pswrd to plain pssword
        if (check) {
          var obj = {
            email: user.email,
            id: user._id,
          };
          const token = makeToken(obj); //create token
          console.log("token",token);
          res.cookie("mycookie", token, {
            httpOnly: true,  // Secure from JavaScript access
            secure: true,   // Set to true in production (HTTPS required)
            sameSite: "None", // Required for cross-origin cookies
          }); //store in cookie
          res.status(200).json({
            message: "Login successful",
            userDetails: user,
            success: true,
          });
        } else {
          res.json({ message: "Invalid password", success: false });
        }
      } else {
        res.json({ message: "User not found", success: false });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ message: "User not found", success: false });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("mycookie");
  res.status(200).json({ message: "Logged out successfully" });
};

const signupUser = async (req, res) => {
  console.log("/signup");
  console.log(req.body);
  const { otpNumber, username, email } = req.body;
  //  Sorts documents by createdAt in descending order (latest first).
  const otpData = await otpModel
    .findOne({ email })
    .sort({ createdAt: -1 });
  console.log("OtpData",otpData);
    if (!otpData) {
      return res.json({ success: false, message: "OTP not found in the Database!" });
    }    

  if (otpData.email == email && otpData.otp == otpNumber) {
    try {
      const password = await bcryptPassword(req.body.password);
      const newUser = new userModel({
        username,
        email,
        password,
      });
      await newUser.save();
      console.log("user",newUser);
      var obj = { email: newUser.email, id: newUser._id };
      const token = makeToken(obj);
      res.cookie("mycookie", token);
      res
        .status(201)
        .json({ message: "User created successfully", success: true });
    } catch (err) {
      console.log(err);
      res.json({ message: "Error creating user",success:false });
    }
  }
  else{
    res.json({success:false,message:"Otp didnt match!!!"});
  }
};

const getUserData = async(req,res) => {
  console.log("----inside getUserData function");
    const user = await getUser(req.cookies.mycookie);
    try {
      const userdata = await userModel.findById(user._id).populate([{path:"mytasks"},{path:"assignedTasks"}]); 
      console.log("Tasks from DB ", tasks);
      res.status(200).json({userdata});
    } catch (err) {
      console.error("Error fetching tasks:", err);
      res
        .status(500)
        .json({ error: "Internal server error. Please try again later." });
    }
}

module.exports = {
  loginUser,
  logoutUser,
  signupUser,
  verifyEmail,
  getUserData
};
