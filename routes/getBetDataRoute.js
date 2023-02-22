const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const getBetDataRoute = express.Router();
const getBetDataController = require("../controller/getbetdata.controller.js");

const { isNull, isUndefined, isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const {server} = req.body;
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(server) || isUndefined(server)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

getBetDataRoute.post("/",verifyData,getBetDataController.getBetData);
module.exports = getBetDataRoute;