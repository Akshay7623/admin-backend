const {ApplyBonusModel} = require('../model/model');

const getBonusRecord = async(req,res,next)=>{
    let bonusRecordData,count;
    const {firstWithTime,lastTime,type} = req.body;
    
    if(type === 'next'){
        bonusRecordData = await ApplyBonusModel.find({time:{ $gt: lastTime }}).sort({time: 1}).limit(20);
      }else{
        bonusRecordData = await ApplyBonusModel.find({time:{ $lt: firstWithTime }}).sort({time: -1}).limit(20);
      }

    count = await ApplyBonusModel.find().count();
    res.json({bonusRecord:bonusRecordData,count:count});
}

module.exports = {getBonusRecord}