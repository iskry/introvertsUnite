const router = require('express').Router();
const apiRoutes = require('./api');

// Prefix all routes with /api
router.use('/api', apiRoutes);

// If invalid route is used, send 404 error message
router.use((req, res) => res.send('Sorry, the requested resource cannot be found.'));

module.exports = router;

