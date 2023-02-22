const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const getBonusRecordRoute = express.Router();
const getBonusRecordController = require("../controller/getbonusrecord.controller.js");

const {isNull,isUndefined,isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{

    const {firstWithTime,lastTime,type} = req.body;

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(firstWithTime) || isUndefined(firstWithTime) ||isNull(lastTime) || isUndefined(lastTime) || isNull(type) || isUndefined(type)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

getBonusRecordRoute.post("/",verifyData,getBonusRecordController.getBonusRecord);
module.exports = getBonusRecordRoute;