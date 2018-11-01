const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  assetId: { type: String },
  address: { type: String },
  type: { type: String }
});

module.exports = mongoose.model('Contact', contactSchema);

