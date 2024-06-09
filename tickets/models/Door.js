// models/door.js
const mongoose = require('mongoose');

const doorSchema = new mongoose.Schema({
  stadiumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stade',
    required: true
  },
  doorName: {
    type: String,
    required: true
  },
  crowdLevel: {
    type: Number,
    required: true
  }
});

const Door = mongoose.model('Door', doorSchema);

module.exports = Door;
