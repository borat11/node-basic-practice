const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  tittle: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User", 
  },
});

module.exports = mongoose.model("blog", blogSchema);
