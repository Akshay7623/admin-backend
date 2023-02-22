const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const searchRechargeRoute = express.Router();
const searchRechargeController = require("../controller/searchrecharge.controller.js");

const { isValidtoken } = require("../DataVerification.js");

const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){

        if((req.body.search).length !==12){
            res.json({message:'AUTH_FAILED'});
            return;
        }

        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

searchRechargeRoute.post("/",verifyData,searchRechargeController.searchRecharge);
module.exports = searchRechargeRoute;