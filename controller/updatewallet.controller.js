const { RegisterModel }  = require('../model/model');

const updateWallet = async(req,res,next)=>{
   const getUser = await RegisterModel.findOne({_id:req.body.id});

   if(getUser){
       const updateBalance = await RegisterModel.updateOne({_id:req.body.id},{wallet:parseInt(req.body.newBal)});
       res.json({message:'success'});
   }else{
       res.json({message:'USER_NOT_EXIST'});
   }

}

module.exports = {updateWallet};