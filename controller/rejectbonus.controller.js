const {ApplyBonusModel,RegisterModel} = require('../model/model');

const rejectBonus = async(req,res,next)=>{
    const {id} = req.body;
    const bonusData = await ApplyBonusModel.findOne({_id:id});
    if(bonusData){
     const {userId,amount} = bonusData;
     const userData = await RegisterModel.findOne({_id:userId});
     if(userData){
         const updateWallet = await RegisterModel.updateOne({_id:userId},{$inc:{bonusWallet:amount}});
         if(updateWallet.matchedCount === 1){
             const deleteBonus = await ApplyBonusModel.deleteOne({_id:id});
         }
         res.json({message:'success'});
     }else{
         res.json({message:'INVALID_USER'});
     }
    }else{
        res.json({message:'INVALID_DATA'});
    }
}

module.exports = {rejectBonus};