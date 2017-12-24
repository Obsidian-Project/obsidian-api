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
  }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
