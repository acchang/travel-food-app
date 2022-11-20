const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  Author: {
    type: String,
    require: true,
  },
  cloudinaryId: {
      type: String,
      require: false,
    },
    image: {
      type: String,
      require: false,
    },
    Store: {
      type: String,
      required: false,
    },
    City: {
      type: String,
      require: false,
    },
    Nabe: {
      type: String,
      required: false,
    },
    Price: {
      type: String,
      required: false,
    },
    Details: {
      type: String,
      required: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: false,
    },

    likes: {
      type: Number,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
});

module.exports = mongoose.model("Post", PostSchema);
