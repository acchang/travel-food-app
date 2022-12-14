const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

getNabe: async (req, res) => {
  try {
    const posts = await Post.find({ Nabe: req.user.nabe });
    res.render("nabe.ejs", { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
},

getCity: async (req, res) => {
  try {
    const posts = await Post.find({ City: req.user.homeCity });
    res.render("city.ejs", { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
},

// getFaves: async (req, res) => {
//   try {
//     const posts = await Post.find({ Nabe: req.user.nabe });
//     res.render("faves.ejs", { posts: posts, user: req.user, comments: comments });
//   } catch (err) {
//     console.log(err);
//   }
// },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const userfile = await User.findById({ _id: req.user.id }) 

      await Post.create({
        Author: userfile.userName,
        Store: req.body.Store === '' ? undefined : req.body.Store,
        City: req.body.City === '' ? undefined : req.body.City,
        Nabe: req.body.Nabe === '' ? undefined : req.body.Nabe,
        Price: req.body.Price === '' ? undefined : req.body.Price,
        createdAt: req.body.createdAt === '' ? undefined : req.body.createdAt,

        image: result.secure_url,
        cloudinaryId: result.public_id,

        Details: req.body.Details === '' ? undefined : req.body.Details,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
