const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// Create a new match
router.post('/', async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(400).json({ message: 'Error creating match' });
  }
});

// Get a list of all matches
router.get('/all', async (req, res) => {
  try {
    const matches = await Match.find({});
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a match by ID
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    console.error('Error fetching match:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a match by ID
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    console.error('Error updating match:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a match by ID
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndRemove(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting match:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Search matches by teams
router.get('/search', async (req, res) => {
  const { team } = req.query;
  try {
    const matches = await Match.find({ teams: new RegExp(team, 'i') });
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error searching matches:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
