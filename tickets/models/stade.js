const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: Number
  },
  capacity: {
    type: Number,
    required: true
  }, 
  price: {
    type: Number,
    required: true
  }
});

const stadeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categories: [categorySchema],
  location: {
    type: String,
    required: true
  }
 ,path:{
  type: String
 }
});

const Stade = mongoose.model('Stade', stadeSchema);

module.exports = Stade;
