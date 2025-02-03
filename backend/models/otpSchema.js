<<<<<<< HEAD
const mongoose = require("mongoose");

const otp = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now, expires: 120 },
});
const otpModel = mongoose.model("otps",otp);
=======
const mongoose = require("mongoose");

const otp = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now, expires: 120 },
});
const otpModel = mongoose.model("otps",otp);
>>>>>>> 905a393c54e3e76e6e3e8bc3db8c2645aa1ad8a7
module.exports=otpModel;