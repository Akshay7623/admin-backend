const {WithdrawModel,AllTransactionModel} = require('../model/model');

const ApproveWithdraw = async(req,res,next)=>{
    const withdrawData = await WithdrawModel.findOne({$and:[{_id:req.body.id},{paymentStatus:0}]});
    if(withdrawData){
       const {userId,time} = withdrawData;
       const updateData = await WithdrawModel.updateOne({_id:req.body.id},{paymentStatus:1});
       const transaction = await AllTransactionModel.updateOne({$and:[{userId:userId},{time:time}]},{transactionStatus:1});
       res.json({message:'success'});
    }else{
        res.json({message:'INVALID_DATA'});
    }
}

module.exports = {ApproveWithdraw};