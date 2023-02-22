const {WithdrawModel} = require('../model/model');

const getWithdraw = async(req,res,next)=>{
    let withdrawData,count;
    const {firstWithTime,lastTime,type} = req.body;
    
    if(type === 'next'){
        withdrawData = await WithdrawModel.find({$and:[{time:{ $gt: lastTime }},{paymentStatus:0}]}).sort({time: 1}).limit(20);
      }else{
        withdrawData = await WithdrawModel.find({$and:[{time:{ $lt: firstWithTime }},{paymentStatus:0}]}).sort({time: -1}).limit(20);
      }

    count = await WithdrawModel.find({paymentStatus:0}).count();
    res.json({withdraw:withdrawData,count:count});

}

module.exports ={getWithdraw};