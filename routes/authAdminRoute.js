const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const authAdminRoute = express.Router();
const authAdminController = require("../controller/authadmin.controller.js");

const { isValidtoken } = require("../DataVerification");

  const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}


authAdminRoute.post("/", verifyData, authAdminController.auth);
module.exports = authAdminRoute;