const router = require('express').Router();

const {
  // Import controller functions for user routes
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// Routes that only need to find '/api/users'
router
  .route('/')
  .get(getUsers) // GET all users
  .post(createUser); // POST a new user

// Routes that use the parameter 'userId'
router
  .route('/:userId')
  .get(getSingleUser) // GET a single user by ID
  .delete(deleteUser) // DELETE a user by ID
  .put(updateUser); // UPDATE a user by ID

// Routes that use two parameters -- ':userId' and ':friendId'
router
  .route('/:userId/friends/:friendId')
  .post(addFriend) // POST a new friend to a user's friend list
  .delete(deleteFriend); // DELETE a friend from a user's friend list

module.exports = router;

