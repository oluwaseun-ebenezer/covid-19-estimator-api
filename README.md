# covid-19-estimator-api
---

**API endpoints:**
* POST  https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/
* POST  https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/json
* POST  https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/xml
* GET https://protected-thicket-07057.herokuapp.com/api/v1/on-covid-19/logs



**POST data example(JSON):**
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
