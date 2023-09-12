const express = require("express");
const router = express.Router();
const Media = require("../models/Media");
const Directory = require("../models/Directory");

router.post("/create", async (req, res) => {
  try {
    const {
      title,
      description,
      selectedIndustry,
      files,
      companyType,
      gst,
      website,
      designation,
      address,
      city,
      state,
      pincode,
      country,
      status,
      sector,
      establishedDate,
      contactPerson,
    } = req.body;

    const fileReferences = [];
    for (let file of files) {
      const { fileSize, fileName, fileType, fileUrl } = file;
      const fileObj = new Media({
        fileSize,
        fileName,
        fileType,
        fileUrl,
      });
      const savedFile = await fileObj.save();
      console.log(savedFile, "svd");
      fileReferences.push(savedFile._id);
    }
    const post = new Directory({
      title,
      description,
      selectedIndustry,
      media: fileReferences,
      companyType,
      gst,
      website,
      designation,
      address,
      city,
      state,
      pincode,
      country,
      status,
      sector,
      establishedDate,
      contactPerson,
    });

    const savedPost = await post.save();
    console.log("Directory created:", savedPost);

    res.json({ message: "Directory created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to retrieve all events
router.get("/", async (req, res) => {
  try {
    const directories = await Directory.find();
    res.status(200).json({ directories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const perPage = 12;

router.get("/alldirectories", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * perPage;

    // Count the total number of documents
    const totalPosts = await Directory.countDocuments();

    const posts = await Directory.find()
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const directories = await Directory.findById(id).populate("media");
    if (!directories) {
      return res.status(404).send();
    }
    res.send({ directories });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get("/:selectedIndustry", async (req, res) => {
  try {
    const selectedIndustry = req.params.selectedIndustry;

    const directories = await Directory.find({ selectedIndustry }).populate(
      "media"
    );

    if (!directories || directories.length === 0) {
      return res
        .status(404)
        .json({ error: "No directories found for the specified industry" });
    }

    res.json(directories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Update a directory by ID
router.put("/:id", async (req, res) => {
  try {
    const directoryId = req.params.id;
    const updatedData = req.body;
    const updatedDirectory = await Directory.findByIdAndUpdate(
      directoryId,
      updatedData,
      { new: true }
    );
    if (!updatedDirectory) {
      return res.status(404).json({ error: "Directory not found" });
    }
    res.status(200).json(updatedDirectory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a directory by ID
router.delete("/:id", async (req, res) => {
  try {
    const directoryId = req.params.id;
    const deletedDirectory = await Directory.findByIdAndDelete(directoryId);
    if (!deletedDirectory) {
      return res.status(404).json({ error: "Directory not found" });
    }
    res.status(200).json({ message: "Directory deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
