const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const getUsersRoute = express.Router();
const getUsersController = require("../controller/getusers.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification.js");


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

getUsersRoute.post("/",verifyData,getUsersController.getUsers);
module.exports = getUsersRoute;