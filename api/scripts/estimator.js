const discardQuotient = (floatingPointNumber) => {
  const stringifiedNumber = floatingPointNumber.toString();
  const wholeNumber = parseInt(stringifiedNumber.split('.')[0], 10);
  return wholeNumber;
};

const covid19ImpactEstimator = (data) => {
  if (data.periodType.toLowerCase() === 'weeks') {
    data.timeToElapse = discardQuotient(data.timeToElapse * 7);
  } else if (data.periodType.toLowerCase() === 'months') {
    data.timeToElapse = discardQuotient(data.timeToElapse * 30);
  }

  const impact = {};
  const severeImpact = {};

  // chanllenge 1
  impact.currentlyInfected = discardQuotient(data.reportedCases * 10);
  severeImpact.currentlyInfected = discardQuotient(data.reportedCases * 50);

  impact.infectionsByRequestedTime = discardQuotient(
    impact.currentlyInfected * (2 ** discardQuotient(data.timeToElapse / 3))
  );
  severeImpact.infectionsByRequestedTime = discardQuotient(
    severeImpact.currentlyInfected * (2 ** discardQuotient(data.timeToElapse / 3))
  );

  // challenge 2
  impact.severeCasesByRequestedTime = discardQuotient(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = discardQuotient(
    severeImpact.infectionsByRequestedTime * 0.15
  );

  impact.hospitalBedsByRequestedTime = discardQuotient((
    data.totalHospitalBeds * 0.35
  ) - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = discardQuotient((
    data.totalHospitalBeds * 0.35
  ) - severeImpact.severeCasesByRequestedTime);

  // challenge 3
  impact.casesForICUByRequestedTime = discardQuotient(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = discardQuotient(
    severeImpact.infectionsByRequestedTime * 0.05
  );

  impact.casesForVentilatorsByRequestedTime = discardQuotient(
    impact.infectionsByRequestedTime * 0.02
  );
  severeImpact.casesForVentilatorsByRequestedTime = discardQuotient(
    severeImpact.infectionsByRequestedTime * 0.02
  );

  impact.dollarsInFlight = discardQuotient(
    (impact.infectionsByRequestedTime * data
      .region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / data.timeToElapse
  );
  severeImpact.dollarsInFlight = discardQuotient(
    (severeImpact.infectionsByRequestedTime * data
      .region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / data.timeToElapse
  );

  return {
    data,
    impact,
    severeImpact
  };
};

module.exports = covid19ImpactEstimator;
