const mongoose = require('mongoose');
const axios = require('axios');
const Match = require('./match');
const Stade = require('./stade'); // Assuming the Stade model is defined in this file

// Function to convert date string to Date object
function parseDate(dateString) {
  return new Date(dateString);
}

// Function to fetch data from the provided URL
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Function to create Match instances from JSON data
async function createMatches() {
  try {
    await mongoose.connect('mongodb://localhost:27017/stadium', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const matchesData = await fetchData('https://worldcupjson.net/matches');
    if (!matchesData) return;

    // Example: Assume you have stadiums stored in your database, fetch one for the example
    const stadiums = await Stade.find(); // Retrieve all stadiums
    if (stadiums.length === 0) {
      console.error('No stadiums found in the database.');
      return;
    }

    for (const matchData of matchesData) {
      // Select a random stadium for demonstration purposes
      const randomStadium = stadiums[Math.floor(Math.random() * stadiums.length)];

      const match = new Match({
        name: `${matchData.home_team.country} vs ${matchData.away_team.country}`,
        home_team_country: matchData.home_team.country,
        away_team_country: matchData.away_team.country,
        date: parseDate(matchData.datetime),
        stade: randomStadium._id // Use the stadium ObjectId
      });

      await match.save();
      console.log(`Match saved: ${match.name}`);
    }

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
}

createMatches();
