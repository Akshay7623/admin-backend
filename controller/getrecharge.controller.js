 const {RechargeModel} = require('../model/model');
const getRecharge = async(req,res,next)=>{
    let rechargeData,count;
    const {firstBetTime,lastTime,type} = req.body;

    if(type === 'next'){
        rechargeData = await RechargeModel.find({$and:[{time:{ $gt: lastTime }},{paymentStatus:1}]}).sort({time: 1}).limit(20);
      }else{
        rechargeData = await RechargeModel.find({$and:[{time:{ $lt: firstBetTime }},{paymentStatus:1}]}).sort({time: -1}).limit(20);
      }

    count = await RechargeModel.find({paymentStatus:1}).count();
    res.json({recharge:rechargeData,count:count});
}

module.exports = {getRecharge};