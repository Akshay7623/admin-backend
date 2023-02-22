const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const UserActionRoute = express.Router();
const UserActionController = require("../controller/useraction.controller.js");

const {isNull, isUndefined , isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(req.body.id) || isUndefined(req.body.id) || isNull(req.body.event) || isUndefined(req.body.event)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        req.body.userId = data.id;
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

UserActionRoute.post("/",verifyData,UserActionController.userAction);
module.exports = UserActionRoute;