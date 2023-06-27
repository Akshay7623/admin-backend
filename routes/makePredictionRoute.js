const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const makePredictionRoute = express.Router();
const makePredictionController = require("../controller/makeprediction.controller.js");

const {isNull,isUndefined,isValidtoken } = require("../DataVerification.js");

const verifyData = (req,res,next)=>{

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(req.body.server) || isUndefined(req.body.server) || isNull(req.body.period) || isUndefined(req.body.period) || isNull(req.body.color) || isUndefined(req.body.color) || isNull(req.body.firstPeriod) || isUndefined(req.body.firstPeriod)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

makePredictionRoute.post("/",verifyData,makePredictionController.makePrediction);
module.exports = makePredictionRoute;