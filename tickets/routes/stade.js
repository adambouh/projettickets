const express = require('express');
const router = express.Router();
const Stade = require('../models/stade');
router.get('/:id', async (req, res) => {
    try {
      const stade = await Stade.findById(req.params.id);
      if (!stade) {
        return res.status(404).json({ message: 'Match not found' });
      }
      res.status(200).json(stade);
    } catch (error) {
      console.error('Error fetching match:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
