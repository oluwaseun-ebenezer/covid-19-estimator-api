# covid-19-estimator-api
---

### Setting Up on a Local Machine
**Type the following sequentially**
* git clone https://github.com/oluwaseun-ebenezer/covid-19-estimator-api.git
* npm install(If you don't have npm install on your local machine, install it before this)
* nodemon server(then your local api server is up and running)



### Using the deployed API
**API endpoints:**
* POST  https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/
* POST  https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/json
* POST  https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/xml
* GET https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/logs



**Sample POST data(JSON):**
```
{
	"region": {
            "name": "Africa",
            "avgAge": 500,
            "avgDailyIncomeInUSD": 5,
            "avgDailyIncomePopulation": 0.71
        },
	"periodType": "weeks",
        "timeToElapse": 10,
        "reportedCases": 67400,
        "population": 54,
        "totalHospitalBeds": 10000000
}
```
**Sample Output(JSON)**

```
{
    data: {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
      },
      periodType: 'days',
      timeToElapse: 58,
      reportedCases: 674,
      population: 66622705,
      totalHospitalBeds: 1380614
    },
    impact: {
      currentlyInfected: 6740,
      infectionsByRequestedTime: 3533701120,
      severeCasesByRequestedTime: 530055168,
      hospitalBedsByRequestedTime: -529571954,
      casesForICUByRequestedTime: 176685056,
      casesForVentilatorsByRequestedTime: 70674022,
      dollarsInFlight: 216286878
    },
    severeImpact: {
      currentlyInfected: 33700,
      infectionsByRequestedTime: 17668505600,
      severeCasesByRequestedTime: 2650275840,
      hospitalBedsByRequestedTime: -2649792626,
      casesForICUByRequestedTime: 883425280,
      casesForVentilatorsByRequestedTime: 353370112,
      dollarsInFlight: 1081434394
    }
  }
```
