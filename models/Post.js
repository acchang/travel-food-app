const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    cloudinaryId: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    Store: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      require: true,
    },
    Nabe: {
      type: String,
      required: true,
    },
    Price: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Remarks: {
      type: String,
      required: false,
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
