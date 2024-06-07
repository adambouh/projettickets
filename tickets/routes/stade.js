const express = require('express');
const router = express.Router();
const Stade = require('../models/stade');

// Get a list of all stadiums
router.get('/all', async (req, res) => {
  try {
    const stadiums = await Stade.find({});
    res.status(200).json(stadiums);
  } catch (error) {
    console.error('Error fetching stadiums:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a stadium by ID
router.get('/:id', async (req, res) => {
  try {
    const stade = await Stade.findById(req.params.id);
    if (!stade) {
      return res.status(404).json({ message: 'Stadium not found' });
    }
    res.status(200).json(stade);
  } catch (error) {
    console.error('Error fetching stadium:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
