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

// Create a new stadium
router.post('/', async (req, res) => {
  try {
    const newStadium = new Stade(req.body);
    await newStadium.save();
    res.status(201).json(newStadium);
  } catch (error) {
    console.error('Error creating stadium:', error);
    res.status(400).json({ message: 'Error creating stadium' });
  }
});

// Update a stadium by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStadium = await Stade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStadium) {
      return res.status(404).json({ message: 'Stadium not found' });
    }
    res.status(200).json(updatedStadium);
  } catch (error) {
    console.error('Error updating stadium:', error);
    res.status(400).json({ message: 'Error updating stadium' });
  }
});

// Delete a stadium by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStadium = await Stade.findByIdAndRemove(req.params.id);
    if (!deletedStadium) {
      return res.status(404).json({ message: 'Stadium not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting stadium:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
