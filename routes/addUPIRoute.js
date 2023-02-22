const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const addUPIRoute = express.Router();
const addUPIController = require("../controller/addupi.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(req.body.upi) || isUndefined(req.body.upi)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        req.body.userId = data.id;
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

addUPIRoute.post("/",verifyData,addUPIController.addUPI);
module.exports = addUPIRoute;