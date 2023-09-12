const mongoose = require("mongoose");

const directorySchema = new mongoose.Schema(
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
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: [true, "Please enter the file details"],
      },
    ],
    companyType: {
      type: String,
      required: [true, "Please enter the company type"],
      trim: true,
    },
    gst: {
      type: String,
      required: [true, "Please enter the GST"],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Please enter the designation"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please enter the address"],
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
    pincode: {
      type: String,
      required: [true, "Please enter the pincode"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Please enter the country"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Please enter the status"],
      trim: true,
    },
    sector: {
      type: String,
      required: [true, "Please enter the sector"],
      trim: true,
    },
    establishedDate: {
      type: Date,
      required: [true, "Please enter the established date"],
    },
    contactPerson: {
      type: String,
      required: [true, "Please enter the contact person"],
      trim: true,
    },
    pan: {
      type: String,
      required: [true, "Please enter the PAN number"],
      trim: true,
      uppercase: true, // Convert the PAN to uppercase
      validate: {
        validator: function (value) {
          // PAN regex pattern validation (example: AAAAA1111A)
          return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
        },
        message: "Please enter a valid PAN number (e.g., AAAAA1111A)",
      },
    },

    turnover: {
      type: String, // Changed to string type
      required: [true, "Please enter the turnover"],
      trim: true,
    },

    phoneNo: {
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

    email: {
      type: String,
      required: [true, "Please enter the email"],
      trim: true,
      validate: {
        validator: function (value) {
          // Email regex pattern validation
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
  },
  { timestamps: true }
);

const Directory = mongoose.model("Directory", directorySchema);

module.exports = Directory;
