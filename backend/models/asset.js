const mongoose = require('mongoose');

const assetSchema = mongoose.Schema({
  type: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isPrivate: { type: Boolean, required: true },
  roomsAmount: { type: Number, required: true },
  size: { type: Number, required: true },
  photos: { type: [String] }
});

module.exports = mongoose.model('Asset', assetSchema);
