const express = require('express')
const xml = require('xml2js')

const covid19ImpactEstimator = require('../scripts/estimator')

const router = express.Router()

const dataTest = (data) => {
    if(data.region){
        if(data.region.name && data.region.avgAge && data.region.avgDailyIncomeInUSD && data.region.avgDailyIncomePopulation){
            if(data.periodType && data.timeToElapse && data.reportedCases && data.population && data.totalHospitalBeds){
                return true
            } else{
                return false
            }
        } else{
            return false
        }
    } else {
        return false
    }
}

const builder = new xml.Builder({
    renderOpts: {
        pretty: false
    }
})

router.post('/', (req,res,next) => {
    if(dataTest(req.body)){
        res.status(200).json({
            result: covid19ImpactEstimator(req.body)
        })
    } else{
        res.status(404).json({
            message: "Incorrect data format was passed."
        })
    }   
})

router.post('/json', (req,res,next) => {
    if(dataTest(req.body)){
        res.status(200).json({
            result: covid19ImpactEstimator(req.body)
        })
    } else{
        res.status(404).json({
            message: "Incorrect data format was passed."
        })
    }   
})

router.post('/xml', (req,res,next) => {
    if(dataTest(req.body)){
        res.status(200).send(builder.buildObject( covid19ImpactEstimator(req.body) ))
    } else{
        res.status(404).send(builder.buildObject({ 
            message: "Incorrect data format was passed."
         }))
    }   
})

module.exports = router