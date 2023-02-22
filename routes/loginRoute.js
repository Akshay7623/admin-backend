const express = require("express");
const loginRoute = express.Router();
const loginController = require("../controller/login.controller.js");


const {isNull, isUndefined , isPassword, isEmail } = require("../DataVerification.js");

  const verifyData = (req, res, next) => {
    
    const userName = req.body.username;
    const password = req.body.password;

    if(isNull(userName) || isUndefined(userName) || isNull(password) || isUndefined(password) || !isEmail(userName) || !isPassword(password)){
        res.json({message:'INVALID_DATA'});
        return;
    }
    next();
  }


loginRoute.post("/",verifyData, loginController.Login);
module.exports = loginRoute;