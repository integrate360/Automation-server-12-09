const express = require("express");
const router = express.Router();
const Media = require("../models/Media");
const Event = require("../models/Events");

// POST route to create a new event
router.post("/create", async (req, res) => {
  try {
    const {
      title,
      description,
      brief,
      files,
      website,
      startTime,
      startDate,
      endDate,
      eventType,
      organiserName,
      organiserEmail,
      organiser_number,
      venue,
      city,
      state,
      country,
      metaDescription,
      metaKeywords,
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
    // Create the event with the uploaded file reference
    const post = new Event({
      title,
      description,
      brief,
      media: fileReferences,
      website,
      startTime,
      startDate,
      endDate,
      eventType,
      organiserName,
      organiserEmail,
      organiser_number,
      venue,
      city,
      state,
      country,
      metaDescription,
      metaKeywords,
    });

    const savedPost = await post.save();
    console.log("Event created:", savedPost);

    res.json({ message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// router.get("/allevents", async (req, res) => {
//   try {
//     const posts = await Event.find().populate("media");

//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

const perPage = 16; // Number of blogs to return per page

router.get("/allevents", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * perPage;

    // Fetch events and sort by date in descending order
    const posts = await Event.find()
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 }) // Sort by startDate in descending order
      .populate("media");

    // Count the total number of documents
    const totalPosts = await Event.countDocuments();

    res.json({
      posts,
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/event", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * perPage;

    // Count the total number of documents
    const totalPosts = await Event.countDocuments();

    let query = Event.find()
      .skip(skip)
      .limit(perPage)
      .sort({ startDate: -1 })
      .populate("media");

    // If a month parameter is provided in the query, filter by month
    if (req.query.month) {
      const month = parseInt(req.query.month);
      const startOfMonth = new Date(
        Date.UTC(new Date().getFullYear(), month - 1, 1)
      );
      const endOfMonth = new Date(
        Date.UTC(new Date().getFullYear(), month, 0, 23, 59, 59)
      );

      query = query.where("startDate").gte(startOfMonth).lte(endOfMonth);
    }

    const posts = await query.exec();

    res.json({
      posts,
      totalPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("media");
    if (!event) {
      return res.status(404).send();
    }
    res.send({ event });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
