const express = require('express');
const cors = require('cors');

// module exports
const { allowOrigins } = require('./utils/allowOrigins');
const GlobalErrorController = require('./utils/globalErrorController');
const AllowanceRoutes = require('./routes/allowanceRoutes');

// init express app
const app = express();

// set cors
app.use(cors({ origin: allowOrigins }));

app.use(express.json());

// api routes
app.use('/api/v1', AllowanceRoutes);

app.use(GlobalErrorController);

module.exports = app;
