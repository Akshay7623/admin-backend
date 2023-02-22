const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const updateWalletRoute = express.Router();
const updateWalletController = require("../controller/updatewallet.controller.js");

const {isNull, isUndefined , isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(req.body.id) || isUndefined(req.body.id) || isNull(req.body.newBal) || isUndefined(req.body.newBal)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        if(parseInt(req.body.newBal)>0){
            next();
            return;
        }
        
        res.json({message:'INVALID_DATA'});

    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

updateWalletRoute.post("/",verifyData,updateWalletController.updateWallet);
module.exports = updateWalletRoute;