const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Create a new user
router.post('/', async (req, res) => {
  try {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = new User({ username, password });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
  console.error('Error creating user:', error);
  res.status(400).json({ message: 'Error creating user' });
}
});


// Get a list of all users
router.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(users);
    }
  });
});
 // Import your user model
// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username in the MongoDB database
    const user = await User.findOne({ username });
    console.log(username,password)
    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the submitted password with the hashed password from the database
    const passwordsMatch = (password === user.password);
    if (passwordsMatch) {
      // Passwords match, create a session for the user
      const token = jwt.sign({ userId: user._id, username: user.username }, 'secret', { expiresIn: '1d' });


      return res.status(200).json({ message: 'Success' ,token, id:user._id,role:user.role});
    } else {
      // Passwords do not match, return an error
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
  // Find a user by username
router.get('/', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

  
  
  

// Update a user by ID
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    }
  });
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(204).send();
      }
    }
  });
});
router.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect or respond as needed
    res.redirect('/login');
  });
});
//return profile from session
router.get('/profile', async (req, res) => {
  // Retrieve the user's ID from the session
  const userId = req.session.userId;

  try {
    // Use the user's ID to fetch user data from your database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user data
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
