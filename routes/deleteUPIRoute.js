const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const deleteUPIRoute = express.Router();
const deleteUPIController = require("../controller/deleteupi.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(req.body.id) || isUndefined(req.body.id)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

deleteUPIRoute.post("/",verifyData,deleteUPIController.deleteUPI);
module.exports = deleteUPIRoute;