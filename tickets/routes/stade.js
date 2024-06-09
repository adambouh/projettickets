const express = require('express');
const router = express.Router();
const Stade = require('../models/stade');
const Door = require('../models/Door');

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
// routes/doors.js


// Get all doors for a specific stadium
router.get('/:stadiumId/doors', async (req, res) => {
  try {
    const doors = await Door.find({ stadiumId: req.params.stadiumId });
    if (!doors) {
      return res.status(404).json({ message: 'Doors not found' });
    }
    res.status(200).json(doors);
  } catch (error) {
    console.error('Error fetching doors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Get crowd levels for doors in a specific stadium
router.get('/:stadiumId/doors/crowd-levels', async (req, res) => {
  try {
    const doors = await Door.find({ stadiumId: req.params.stadiumId });
    if (!doors) {
      return res.status(404).json({ message: 'Doors not found' });
    }

    const doorData = {};
    doors.forEach(door => {
      doorData[door.doorName] = door.crowdLevel;
    });

    res.status(200).json(doorData);
  } catch (error) {
    console.error('Error fetching door crowd levels:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Add a new door to a stadium
router.post('/:stadiumId/doors', async (req, res) => {
  try {
    const { doorName, crowdLevel } = req.body;
    const newDoor = new Door({
      stadiumId: req.params.stadiumId,
      doorName,
      crowdLevel
    });
    await newDoor.save();
    res.status(201).json(newDoor);
  } catch (error) {
    console.error('Error adding new door:', error);
    res.status(400).json({ message: 'Error adding new door' });
  }
});

// Update crowd level for a specific door
router.patch('/:stadiumId/doors/:doorId', async (req, res) => {
  try {
    const { crowdLevel, doorName } = req.body;
    const updateData = {};
    if (crowdLevel !== undefined) updateData.crowdLevel = crowdLevel;
    if (doorName !== undefined) updateData.doorName = doorName;

    const updatedDoor = await Door.findOneAndUpdate(
      { _id: req.params.doorId, stadiumId: req.params.stadiumId },
      updateData,
      { new: true }
    );
    if (!updatedDoor) {
      return res.status(404).json({ message: 'Door not found' });
    }
    res.status(200).json(updatedDoor);
  } catch (error) {
    console.error('Error updating door:', error);
    res.status(400).json({ message: 'Error updating door' });
  }
});

// Delete a door by ID
router.delete('/:stadiumId/doors/:doorId', async (req, res) => {
  try {
    const deletedDoor = await Door.findOneAndDelete({ _id: req.params.doorId, stadiumId: req.params.stadiumId });
    if (!deletedDoor) {
      return res.status(404).json({ message: 'Door not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting door:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


module.exports = router;
