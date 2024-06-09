const mongoose = require('mongoose');
const Door = require('./Door'); // Assuming door model is in models folder

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/stadium', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const doorsData = [
    { doorName: "Porte A", crowdLevel: 10 },
    { doorName: "Porte B", crowdLevel: 20 },
    { doorName: "Porte C", crowdLevel: 30 },
    { doorName: "Porte D", crowdLevel: 40 }
];

const stadiumIds = [
    '665f97c0f9987f907233e733',
    '665f97c0f9987f907233e738',
    '665f97c0f9987f907233e73d',
    '665f97c0f9987f907233e742',
    '665f97c0f9987f907233e747'
];

const addDoorsToStadium = async (stadiumId) => {
    const doors = doorsData.map(door => ({
        ...door,
        stadiumId
    }));

    try {
        await Door.insertMany(doors);
        console.log(`Doors added to stadium ${stadiumId}`);
    } catch (error) {
        console.error(`Error adding doors to stadium ${stadiumId}:`, error);
    }
};

const run = async () => {
    for (const stadiumId of stadiumIds) {
        await addDoorsToStadium(stadiumId);
    }
    mongoose.connection.close();
};

run();
