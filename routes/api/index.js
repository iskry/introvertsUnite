const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtsRoutes');

// set up user routes
router.use('/users', userRoutes);

// set up thought routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;

