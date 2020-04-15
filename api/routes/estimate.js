const express = require('express');
const xml = require('xml2js');
const fs = require('fs');

const covid19ImpactEstimator = require('../scripts/estimator');

const router = express.Router();

const dataTest = (data) => {
  if (data.region) {
    if (data.region.name && data.region
      .avgAge && data.region.avgDailyIncomeInUSD && data.region.avgDailyIncomePopulation) {
      if (data.periodType && data
        .timeToElapse && data.reportedCases && data.population && data.totalHospitalBeds) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
};

const builder = new xml.Builder({
  renderOpts: {
    pretty: false
  }
});

router.post('/', (req, res) => {
  if (dataTest(req.body)) {
    res.status(200).json({
      result: covid19ImpactEstimator(req.body)
    });
  } else {
    res.status(404).json({
      message: 'Incorrect data format was passed.'
    });
  }
});

router.post('/json', (req, res) => {
  if (dataTest(req.body)) {
    res.status(200).json({
      result: covid19ImpactEstimator(req.body)
    });
  } else {
    res.status(404).json({
      message: 'Incorrect data format was passed.'
    });
  }
});

router.post('/xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  if (dataTest(req.body)) {
    res.status(200).send(builder.buildObject(covid19ImpactEstimator(req.body)));
  } else {
    res.status(404).send(builder.buildObject({
      message: 'Incorrect data format was passed.'
    }));
  }
});

router.get('/logs', (req, res) => {
  fs.readFile('./logs/all-logs.log', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
