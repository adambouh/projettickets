const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Match = require('../models/match');
const Stade = require('../models/stade');

const QRCode = require('qrcode');
const mongoose = require('mongoose');

// Create a ticket
router.post('/', async (req, res) => {
  try {
    const { match, client, category, seat, price } = req.body;

    if (!match || !client || !category || !seat || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTicket = new Ticket({
      match,
      client,
      category,
      price
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({ ticketId: newTicket._id }));
    newTicket.qrCode = qrCodeUrl;

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(400).json({ message: 'Error creating ticket' });
  }
});

// Cancel a ticket
router.patch('/cancel/:id', async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = 'canceled';
    await ticket.save();
    res.status(200).json({ message: 'Ticket canceled successfully' });
  } catch (error) {
    console.error('Error canceling ticket:', error);
    res.status(500).json({ message: 'Error canceling ticket' });
  }
});

// Generate a QR code for an existing ticket
router.get('/qr/:id' , async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({ ticketId: ticket._id }));
    res.status(200).json({ qrCode: qrCodeUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ message: 'Error generating QR code' });
  }
});
router.get('/:ticketId', async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await Ticket.findById(ticketId).populate('match');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Error fetching ticket' });
  }
});
router.get('/available-tickets/:matchId', async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const match = await Match.findById(matchId).populate('stade');
    
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    const stadium = match.stade;
    const availableTickets = await Ticket.aggregate([
      { $match: { match: new mongoose.Types.ObjectId(matchId), status: { $ne: 'canceled' } } }, // Match tickets that are not canceled and belong to the match
      {
        $group: {
          _id: '$category',
          sold: { $sum: 1 }
        }
      }
    ]);

    const availableByCategory = stadium.categories.map(category => {
      const soldTickets = availableTickets.find(ticket => ticket.category === category.id);
      const sold = soldTickets ? soldTickets.sold : 0;
      return {
        category: category.id,
        available: category.capacity - sold,
        price:  category.price
      };
    });

    res.status(200).json(availableByCategory);
  } catch (error) {
    console.error('Error fetching available tickets:', error);
    res.status(500).json({ message: 'Error fetching available tickets' });
  }
});
router.get('/client/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const tickets = await Ticket.find({ client: clientId }).populate('match');

    if (!tickets) {
      return res.status(404).json({ message: 'No tickets found for this client' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets for client:', error);
    res.status(500).json({ message: 'Error fetching tickets for client' });
  }
});

module.exports = router;
