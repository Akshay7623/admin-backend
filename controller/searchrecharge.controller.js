const {RechargeModel} = require('../model/model');

const searchRecharge = async(req,res,next)=>{

     const rechargeData = await RechargeModel.find({$and:[{UTR:req.body.search},{paymentStatus:1}]});
     const count =  await RechargeModel.find({UTR:req.body.search});
     if(rechargeData){
        res.json({recharge:rechargeData,count:count});
     }else{
         res.json({message:'DATA_NOT_EXISTS'});
     }
}

module.exports = {searchRecharge};