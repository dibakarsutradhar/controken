const express = require('express');
const { getTx } = require('../controllers/allowanceControllers');

// init express route
const router = express.Router();

// allowance routes
router.get('/gettx', getTx);

module.exports = router;
