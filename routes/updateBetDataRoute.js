const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const updateBetDataRoute = express.Router();
const updateBetDataController = require("../controller/updatebetdata.controller.js");

const { isNull, isUndefined, isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const {server,number} = req.body;
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(server) || isUndefined(server) || isNull(number) || isUndefined(number) ){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

updateBetDataRoute.post("/",verifyData,updateBetDataController.updateBetData);
module.exports = updateBetDataRoute;