const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: [true, "Please enter the file details"],
      },
    ],
    brief: {
      type: String,
      required: [true, "Please enter a brief"],
      trim: true,
      maxlength: [500, "Brief cannot be more than 500 characters"],
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
      trim: true,
      maxlength: [5000, "Description cannot be more than 5000 characters"],
    },
    startTime: {
      type: String,
      required: [true, "Please enter the start time"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Please enter the start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please enter the end date"],
    },
    eventType: {
      type: String,
      required: [true, "Please enter the event type"],
      trim: true,
    },
    organiserName: {
      type: String,
      required: [true, "Please enter the organiser name"],
      trim: true,
    },
    organiserEmail: {
      type: String,
      required: [true, "Please enter the organiser email"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    venue: {
      type: String,
      required: [true, "Please enter the venue"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Please enter the city"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "Please enter the state"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Please enter the country"],
      trim: true,
    },
    organiser_number: {
      type: String,
      required: [true, "Please enter the phone number"],
      trim: true,
      validate: {
        validator: function (value) {
          // Phone number regex pattern validation
          return /^[0-9]{10}$/.test(value);
        },
        message: "Please enter a valid 10-digit phone number",
      },
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Event", eventSchema);
