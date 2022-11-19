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
    Details: {
      type: String,
      // required: false,
      default: "yikes",
    },

    createdAt: {
      type: Date,
      // required: false,
      default: Date.now,
    },

    likes: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
});

module.exports = mongoose.model("Post", PostSchema);
