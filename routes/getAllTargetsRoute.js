const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const getAllTargetsRoute = express.Router();
const getAllTargetsController = require("../controller/getalltargets.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification.js");


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

getAllTargetsRoute.post("/",verifyData,getAllTargetsController.getAllTargets);
module.exports = getAllTargetsRoute;