const {WithdrawModel,RegisterModel,AllTransactionModel} = require('../model/model');

const rejectWithdraw = async (req,res,next)=>{
    const withdrawData = await WithdrawModel.findOne({$and:[{_id:req.body.id},{paymentStatus:0}]});
    if(withdrawData){
        const {userId,withdrawAmount,time} = withdrawData;
        const userData = await RegisterModel.findOne({_id:userId});
        if(userData){
            const {wallet} = userData;
            let newBal = wallet + withdrawAmount;
            const updateData = await WithdrawModel.updateOne({_id:req.body.id},{paymentStatus:2});
            const updateUser = await RegisterModel.updateOne({_id:userId},{wallet:newBal});
            const transaction = await AllTransactionModel.updateOne({$and:[{userId:userId},{time:time}]},{transactionStatus:2});
            res.json({message:'success'});
        }else{
            res.json({message:'DATA_NOT_EXIST'});
        }
    }else{
        res.json({message:'INVALID_DATA'});
    }
}

module.exports = {rejectWithdraw};