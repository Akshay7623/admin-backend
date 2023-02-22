const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const showUPIRoute = express.Router();
const showUPIController = require("../controller/showupi.controller.js");

const { isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

showUPIRoute.get("/",verifyData,showUPIController.showUPI);
module.exports = showUPIRoute;