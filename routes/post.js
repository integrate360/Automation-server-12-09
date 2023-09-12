const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const Media = require("../models/Media");
const Category = require("../models/Category");
const cron = require("node-cron");
const moment = require("moment");

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      selectedIndustry,
      brief,
      category,
      image,
      keyword,
      slug,
      metaDescription,
      scheduledDate,
    } = req.body;

    // const fileReferences = [];
    // for (let file of files) {
    //   const { fileSize, fileName, fileType, fileUrl } = file;
    //   const fileObj = new Media({
    //     fileSize,
    //     fileName,
    //     fileType,
    //     fileUrl,
    //   });
    //   const savedFile = await fileObj.save();
    //   console.log(savedFile, "svd");
    //   fileReferences.push(savedFile._id);
    // }

    const createPost = async () => {
      const post = new Post({
        title,
        description,
        selectedIndustry,
        brief,
        category,
        keyword,
        slug,
        metaDescription,
        image,
      });
      const savedPost = await post.save();

      console.log("Blog post created:", savedPost);
    };

    if (scheduledDate) {
      // Schedule the blog post creation
      const scheduledDateTime = moment(scheduledDate).format("mm HH DD MM *");
      cron.schedule(
        scheduledDateTime,
        () => {
          createPost();
          console.log("Cron job is running");
        },
        { scheduled: true }
      );

      res.json({ message: "Blog post scheduled successfully" });
    } else {
      // Create the blog post immediately
      await createPost();

      res.json({ message: "Blog post created successfully" });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

const perPage = 16; // Number of blogs to return per page

router.get("/allposts", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * perPage;

    // Count the total number of documents
    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json({
      posts,
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * perPage;
    const category = req.params.category;

    // Count the total number of documents for the specified category
    const totalPosts = await Post.countDocuments({ category });

    const posts = await Post.find({ category })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .populate("media");

    res.json({
      posts,
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send();
    }
    res.send({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      selectedIndustry,
      brief,
      category,
      image,
      keyword,
      slug,
      metaDescription,
    } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        selectedIndustry,
        brief,
        category,
        image,
        keyword,
        slug,
        metaDescription,
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).send();
    }
    res.send({ post });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send();
    }
    res.send({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Post.findById(postId).populate("files");

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/allfiles", async (req, res) => {
  console.log(req, "reqqqqqqqqqq");
  try {
    const files = await Media.find();
    console.log(files, "files");
    if (files.length === 0) {
      return res.json({ message: "No files found" });
    }

    res.json(files);
  } catch (error) {
    console.log(error, "errrrrrrrr");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/files", async (req, res) => {
  try {
    const fileType = req.body.fileType;
    const files = await Media.find({ fileType });

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/posts/:category", async (req, res) => {
//   try {
//     const category = req.params.category;

//     const posts = await Post.find({ category }).populate("media");

//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/posts/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const posts = await Post.find({
      keyword: { $regex: keyword, $options: "i" },
    }).populate("media");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
