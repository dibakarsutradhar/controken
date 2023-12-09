const express = require('express');
const { getevents } = require('../controllers/allowanceControllers');

// init express route
const router = express.Router();

// allowance routes
router.get('/getevents', getevents);

module.exports = router;
