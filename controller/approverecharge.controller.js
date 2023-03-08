const {RechargeModel,RegisterModel,AllTransactionModel} = require('../model/model');

const ApproveRecharge = async (req,res,next)=>{
    const {id} = req.body;
    const rechargeData = await RechargeModel.findOne({$and:[{_id:id},{paymentStatus:1}]});
    
    if(rechargeData){
       const {userId,time} = rechargeData;
       let user = await RegisterModel.findOne({_id:rechargeData.userId});
       if(user){

        if(user.bonusDone === 0){
         if(rechargeData.rechargeAmount >=500){
           const parentData = await RegisterModel.findOne({ReferCode:user.inviteCode});
            if(parentData){
                const updateParentBonus = await RegisterModel.updateOne({ReferCode:user.inviteCode},{$inc:{bonusWallet:100}});
            }
         }
         const updateBonusDone = await RegisterModel.updateOne({_id:userId},{bonusDone:1});
        }

        let wallet = user.wallet + rechargeData.rechargeAmount;
        const updateWallet = await RegisterModel.updateOne({_id:rechargeData.userId},{wallet:wallet});
        const updateRecharge = await RechargeModel.updateOne({_id:id},{paymentStatus:2});
        const  transaction = await AllTransactionModel.updateOne({$and:[{userId:userId},{time:time}]},{transactionStatus:1});
        res.json({message:'success'});

       }else{
           res.json({message:'USER_NOT_EXIST'});
       }
    }else{
        res.json({message:'DATA_NOT_EXIST'});
    }
}

module.exports = {ApproveRecharge};