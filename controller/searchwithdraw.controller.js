const {WithdrawModel} = require('../model/model');
const searchWithdraw = async (req,res,next)=>{
   const withdrawData = await WithdrawModel.find({source:req.body.search});
   if(withdrawData){
       res.json({withdraw:withdrawData,count:1});
   }else{
    res.json({withdraw:withdrawData,count:0});
   }
}

module.exports = {searchWithdraw};