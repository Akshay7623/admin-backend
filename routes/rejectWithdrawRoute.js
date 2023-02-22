const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const rejectWithdrawRoute = express.Router();
const rejectWithdrawController = require("../controller/rejectwithdraw.controller.js");

const {isNull,isUndefined,isValidtoken } = require("../DataVerification.js");

const verifyData = (req,res,next)=>{

    const {id} = req.body;

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(id) || isUndefined(id) || id.length !==24){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

rejectWithdrawRoute.post("/",verifyData,rejectWithdrawController.rejectWithdraw);
module.exports = rejectWithdrawRoute;