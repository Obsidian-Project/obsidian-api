const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true
  },
  name: {
     type: String,
     required: true          
  },
  profileImageUrl: {
    type: String,
    required: true
  },
  assigned: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
