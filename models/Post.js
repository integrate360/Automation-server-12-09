const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter the description"],
      trim: true,
      maxlength: [5000, "Content cannot be more than 5000 characters"],
    },
    selectedIndustry: {
      type: String,
      required: [true, "Please enter the industry"],
    },
    brief: {
      type: String,
      required: [true, "Please enter the brief"],
      trim: true,
      maxlength: [5000, "Content cannot be more than 5000 characters"],
    },
    slug: {
      type: String,
      required: [true, "Please enter a slug"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Please enter at least one category"],
    },
    keyword: {
      type: [String],
      trim: true,
    },
    metaDescription: {
      type: String,
      required: [true, "Please enter the description"],
      trim: true,
      maxlength: [5000, "Content cannot be more than 5000 characters"],
    },
    image: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
