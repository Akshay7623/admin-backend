const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const setActiveTargetsRoute = express.Router();
const setActiveTargetsController = require("../controller/setactivetarget.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{

    const {server,target} = req.body;

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(server) || isUndefined(server) | isNull(target) ||isUndefined(target)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

setActiveTargetsRoute.post("/",verifyData,setActiveTargetsController.setActiveTarget);
module.exports = setActiveTargetsRoute;