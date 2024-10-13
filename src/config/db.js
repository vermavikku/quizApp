const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config(); 

// Connection URI
const uri = process.env.DB_URL;

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000, 
})
.then(() => {
  console.log(`Connected to MongoDB at ${uri}`);
})
.catch((err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection events
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Export the connection
module.exports = db;
