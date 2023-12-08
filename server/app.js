const express = require('express');
const cors = require('cors');

// module exports
const { allowOrigins } = require('./utils/allowOrigins');
const GlobalErrorController = require('./utils/globalErrorController');

// init express app
const app = express();

// set cors
app.use(cors({ origin: allowOrigins }));

app.use(express.json());

// api routes

app.use(GlobalErrorController);

module.exports = app;
