const {RegisterModel,WithdrawModel,AllTargetModel} = require('../model/model');
const express = require("express"); 
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const webhookSecret = process.env.PAYOUT_KEY;
const payoutRoute = express.Router();
 

const verifyData = async (req,res)=>{
    const webhookBody = req.body;
    const webhookSignature = req.headers["x-razorpay-signature"];
    if (typeof webhookSignature === 'undefined' || typeof req.body === 'undefined') {
      res.json({ success: false });
      return;
    }
    if (req.body.toString().trim() === '' || webhookSignature.toString().trim() === '') {
      res.json({ success: false });
      return;
    }
  
    if (validateWebhookSignature(JSON.stringify(webhookBody), webhookSignature, webhookSecret)) {

      let amount = webhookBody.payload.payout.amount;
      let userId = webhookBody.payload.payout.notes.userId;
      let transactionId = webhookBody.payload.payout.notes.transactionId;
      let transactionDataId = webhookBody.payload.payout.notes.transactionDataId;

      let checkWithdrawData = await WithdrawModel.findOne({$and:[{_id:transactionId},{paymentStatus:1}]});

      if (webhookBody.event === 'payout.reversed' || webhookBody.event === 'payout.failed' || webhookBody.event === 'payout.rejected') {
        if(checkWithdrawData){
            await WithdrawModel.updateOne({_id:transactionId},{paymentStatus:2});
            await AllTargetModel.updateOne({_id:transactionDataId},{transactionStatus:2});
            await RegisterModel.updateOne({_id:userId},{$inc:{wallet:amount}});
        }          
      }
    }
    res.send('Ok');
}

payoutRoute.post("/",verifyData);
module.exports = payoutRoute;