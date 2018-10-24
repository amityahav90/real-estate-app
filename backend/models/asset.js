const mongoose = require('mongoose');

const assetSchema = mongoose.Schema({
  type: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  roomsAmount: { type: Number, required: true },
  size: { type: Number, required: true },
  photos: { type: [String] },
  neighborhood: { type: String },
  totalFloors: { type: Number },
  assetFloor: { type: Number },
  entranceDate: { type: Date },
  isAirCondition: { type: Boolean },
  isElevator: { type: Boolean },
  isBalcony: { type: Boolean },
  isParking: { type: Boolean },
  isShield: { type: Boolean },
  isStroeroom: { type: Boolean }
});

module.exports = mongoose.model('Asset', assetSchema);
