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
      default: 'vendor not entered',
      required: false,
    },
    City: {
      type: String,
      default: 'city not entered',
      require: false,
    },
    Nabe: {
      type: String,
      default: 'nabe not entered',
      required: false,
    },
    Price: {
      type: String,
      default: 'price not entered',
      required: false,
    },
    Details: {
      type: String,
      default: 'no comments',
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
