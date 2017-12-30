const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  equipmentId: {
    type: Number,
    required: true,
    index: true
  },
  model: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  details: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mainFeature: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  landCoverage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
