const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  away_team_country: {
    type: String,
    required: true
  },
  home_team_country: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  stade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stade',
    required: true
  }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
