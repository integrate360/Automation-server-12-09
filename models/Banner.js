const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bannerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
