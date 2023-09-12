const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const headeradsSchema = new Schema({
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
 }, {
  timestamps: true,
});

const HeaderAds = mongoose.model('HeaderAds', headeradsSchema);

module.exports = HeaderAds;
