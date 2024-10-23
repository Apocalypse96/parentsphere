const express = require('express');
const router = express.Router();
const circleController = require('../controllers/circleController');

// Route to create a user-initiated circle
router.post('/create', circleController.createUserInitiatedCircle);

// Route to search for circles (discoverability feature)
router.get('/search', circleController.searchCircles);

module.exports = router;
