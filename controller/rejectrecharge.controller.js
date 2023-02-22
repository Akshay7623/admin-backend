const {RechargeModel,RegisterModel,AllTransactionModel} = require('../model/model');

const RejectRecharge = async(req,res,next)=>{
    const {id} = req.body;
    const rechargeData = await RechargeModel.findOne({$and:[{_id:id},{paymentStatus:1}]});
    if(rechargeData){
       const {userId,time} = rechargeData;
       let user = await RegisterModel.findOne({_id:rechargeData.userId});
       if(user){
        const updateRecharge = await RechargeModel.updateOne({_id:id},{paymentStatus:4});
        const transaction = await AllTransactionModel.updateOne({$and:[{userId:userId},{time:time}]},{transactionStatus:2});
        res.json({message:'success'});
       }else{
           res.json({message:'USER_NOT_EXIST'});
       }
    }else{
        res.json({message:'DATA_NOT_EXIST'});
    }
}

module.exports = {RejectRecharge};