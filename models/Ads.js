const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adsSchema = new Schema({
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
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Ads = mongoose.model('Ads', adsSchema);

module.exports = Ads;
