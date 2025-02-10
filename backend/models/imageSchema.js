const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: String,  // The name of the image file
  filepath: String,  // The path where the image is stored
  uploadedAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("Image", ImageSchema);
