const connection = require('../config/connection'); // Importing the Mongoose connection
const { User, Thought } = require('../models'); // Importing the User and Thought models

connection.on('error', (err) => err); // Listening to the error event and returning the error

connection.once('open', async () => { // Listening to the open event once
  console.log('🔌 NoSQL connected! 🔌'); // Logging a message to indicate that the connection is open

  // Drop existing users
  await User.deleteMany({}); // Deleting all users from the database

  // Drop existing thoughts
  await Thought.deleteMany({}); // Deleting all thoughts from the database

  // console.info('🌱 Seeding complete! 🌱');
  process.exit(0); // Exiting the process once the seeding is complete
});

// This file is used to clear the database by deleting all users and thoughts. It is not used for anything else in the project.

