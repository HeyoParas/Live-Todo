const userModel = require("../models/userSchema");
const { getUser } = require("../controllers/token");
const updateProfile = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await getUser(req.cookies.mycookie);
    if (!req.file) {
      return res.json({ message: "No file uploaded",sucess:false });
    }

    const imagePath = `/uploads/${req.file.filename}`; // Path to save in DB

    // Find the user and update the image path
    const userData = await userModel.findByIdAndUpdate(
      user.id, 
      { profileImage: imagePath },
      username,
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Profile Updated successfully", userData, sucess: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error updating profile", error: error.message, sucess: false });
  }
};
module.exports = { updateProfile };
