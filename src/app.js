const express = require('express');
const bodyParser = require('body-parser');

const httpLogger = require('../api/middleware/httpLogger');
const estimateRoute = require('../api/routes/estimate');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

app.use(httpLogger);

app.use(bodyParser.json());

app.use('/api/v1/on-covid-19', estimateRoute);

module.exports = app;
