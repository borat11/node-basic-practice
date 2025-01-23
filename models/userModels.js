const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true, // Corrected spelling
  },
  email: {
    type: String,
    required: true, // Corrected spelling
  },
  password: {
    type: String,
    required: true, // Corrected spelling
  },
  emailVerify: {
    type: Boolean,
    default: false, // Corrected spelling
  },
});

module.exports = mongoose.model("User", userSchema);
