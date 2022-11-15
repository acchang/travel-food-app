const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  cloudinaryId: {
    type: String,
    require: true,
  },
  dishName: {
    type: String,
    required: true,
  },
  eateryName: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
