const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Ticket = require('../models/ticket');
const QRCode = require('qrcode');

// Route for saving payment details and creating tickets
router.post('/save-payment', async (req, res) => {
    try {

        const {client, Match, tickets, name, cardNumber, expiryDate, securityCode, zipCode } = req.body;
        // Save payment details to the database
        const newPayment = new Payment({
            client,
            name,
            cardNumber,
            expiryDate,
            securityCode,
            zipCode
        });
        await newPayment.save();
        // Create individual tickets based on received data
        const createdTickets = [];
        for (const ticketData of tickets) {
            const {  category, price, quantity } = ticketData;
            console.log(price);
            const match=Match; 
            // Create individual tickets based on quantity
            for (let i = 0; i < quantity; i++) {
                const newTicket = new Ticket({
                    match,
                    client,
                    category,
                    price
                });

                // Generate QR code
                const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({ ticketId: newTicket._id }));
                newTicket.qrCode = qrCodeUrl;
                console.log(newTicket.match);
                // Save the ticket to the database
                await newTicket.save();

                // Push the created ticket to the array
                createdTickets.push(newTicket);
            }
        }

        res.status(201).json({ message: 'Payment details saved and tickets created successfully', createdTickets });
    } catch (error) {
        console.error('Error saving payment details and creating tickets:', error);
        res.status(500).json({ message: 'Error saving payment details and creating tickets' });
    }
});

module.exports = router;
