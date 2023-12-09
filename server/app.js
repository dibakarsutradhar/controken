require('dotenv').config();
const express = require('express');
const cors = require('cors');

// module exports
const { allowOrigins } = require('./utils/allowOrigins');
const GlobalErrorController = require('./utils/globalErrorController');
const AllowanceRoutes = require('./routes/allowanceRoutes');
const { init } = require('@airstack/node');

// init express app
const app = express();

const AIRSTACK_API = process.env.AIRSTACK_API_KEY;
init(AIRSTACK_API);

// set cors
app.use(cors({ origin: allowOrigins }));

app.use(express.json());

// api routes
app.use('/api/v1', AllowanceRoutes);

app.use(GlobalErrorController);

module.exports = app;
