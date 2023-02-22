const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const getRechargeRoute = express.Router();
const getRechargeController = require("../controller/getrecharge.controller.js");

const {isNull,isUndefined,isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{

    const {firstBetTime,lastTime,type} = req.body;

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(firstBetTime) || isUndefined(firstBetTime) ||isNull(lastTime) || isUndefined(lastTime) || isNull(type) || isUndefined(type)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

getRechargeRoute.post("/",verifyData,getRechargeController.getRecharge);
module.exports = getRechargeRoute;