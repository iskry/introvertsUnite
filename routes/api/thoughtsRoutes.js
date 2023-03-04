// Importing express Router
const router = require('express').Router();

// Importing thoughtController functions
const {
  // Get All thoughts
  getThoughts,
  // Create new thought
  createThought,
  // Get a single thought
  getSingleThought,
  // Update a single thought
  updateThought,
  // Delete a single thought
  deleteThought,
  // Create a new reaction to a thought
  createReaction,
  // Delete a reaction from a thought
  deleteReaction, 
} = require("../../controllers/thoughtController");

// Routes for '/api/thoughts'
router
  .route('/')
  .get(getThoughts) // Get All Thoughts
  .post(createThought); // Create a new Thought

// Routes for '/api/thoughts/:thoughtId'
router
  .route('/:thoughtId')
  .get(getSingleThought) // Get a single Thought by id
  .delete(deleteThought) // Delete a single Thought by id
  .put(updateThought); // Update a single Thought by id

// Routes for '/api/thoughts/:thoughtId/reactions'
router
  .route('/:thoughtId/reactions')
  .post(createReaction) // Create a new Reaction for a Thought
  .delete(deleteReaction); // Delete a Reaction from a Thought

// Exporting router
module.exports = router;

