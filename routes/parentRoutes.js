const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

// Route to register a parent and add them to social circles
router.post('/register', parentController.registerParent);

// Route to fetch a parent's profile and their circles
router.get('/:parentId', parentController.getParentProfile);

// Route to update parent details (e.g., child grade, section, or community)
router.put('/:parentId', parentController.updateParentDetails);

module.exports = router;
