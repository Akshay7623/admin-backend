const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const setComplainsRoute = express.Router();
const setComplainsController = require("../controller/setcomplains.controller.js");

const {isNull,isUndefined,isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{

    const {id,solution} = req.body;

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(id) || isUndefined(id) ||isNull(solution) || isUndefined(solution)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

setComplainsRoute.post("/",verifyData,setComplainsController.setComplains);
module.exports = setComplainsRoute;