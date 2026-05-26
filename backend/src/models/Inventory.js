const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please add a product name']
  },
  sku: {
    type: String,
    unique: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0,
    required: [true, 'Please add inventory quantity']
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
