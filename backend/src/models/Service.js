const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name']
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Please add a service category (e.g., Hair, Nails, Massage)']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  durationMinutes: {
    type: Number,
    required: [true, 'Please add duration in minutes']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
