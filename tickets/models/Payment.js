const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    client: {     type: mongoose.Schema.Types.ObjectId
        , required: true },
    name: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    securityCode: { type: String, required: true },
    zipCode: { type: String, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
