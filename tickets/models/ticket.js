const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  category: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['active', 'canceled'], default: 'active' },
  qrCode: { type: String } // URL or path to QR code image
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);
