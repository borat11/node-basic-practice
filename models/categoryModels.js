const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true, // Corrected spelling
  },
  description: {
    type: String,
    required: true, // Corrected spelling
  }
});

module.exports = mongoose.model("Category", categorySchema);
