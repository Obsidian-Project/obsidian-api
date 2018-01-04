const mongoose = require('mongoose');

const SmartContractSchema = new mongoose.Schema({ 
  abi: {
     type: Array,
     required: true          
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SmartContract', SmartContractSchema);
