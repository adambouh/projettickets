const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = 5000;

// Set up middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
// Connect to MongoDB
mongoose.connect('mongodb://localhost/stadium', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 21600000 , // Session expiration time in milliseconds (1 day)
    // Other cookie options as needed
  }
  // Other options as needed
}));
// Define routes for user operations (CRUD)
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);
const stadesRouter = require('./routes/stade');
const matchesRouter = require('./routes/match');
app.use('/api/stade', stadesRouter);
app.use('/api/matches', matchesRouter);
const Payment = require('./routes/payment');
app.use('/api/', Payment);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
