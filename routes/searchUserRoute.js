const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const searchUsersRoute = express.Router();
const searchUsersController = require("../controller/searchusers.controller.js");

const { isValidtoken } = require("../DataVerification.js");


const verifyData = (req,res,next)=>{
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){

        if((req.body.search).length !==10){
            res.json({message:'AUTH_FAILED'});
            return;
        }

        req.body.userId = data.id;
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

searchUsersRoute.post("/",verifyData,searchUsersController.searchUsers);
module.exports = searchUsersRoute;