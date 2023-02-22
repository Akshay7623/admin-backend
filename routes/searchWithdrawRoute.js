const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const searchWithdrawRoute = express.Router();
const searchWithdrawController = require("../controller/searchwithdraw.controller.js");

const { isValidtoken } = require("../DataVerification.js");

const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){

        if((req.body.search).length === 0){
            res.json({message:'AUTH_FAILED'});
            return;
        }

        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

searchWithdrawRoute.post("/",verifyData,searchWithdrawController.searchWithdraw);
module.exports = searchWithdrawRoute;