const {ComplaintsModel} = require('../model/model');

const getComplains = async(req,res,next)=>{
    let ComplaintData,count;
    const {firstWithTime,lastTime,type} = req.body;
    
    if(type === 'next'){
        ComplaintData = await ComplaintsModel.find({$and:[{time:{ $gt: lastTime }},{solved:0}]}).sort({time: 1}).limit(20);
      }else{
        ComplaintData = await ComplaintsModel.find({$and:[{time:{ $lt: firstWithTime }},{solved:0}]}).sort({time: -1}).limit(20);
      }

    count = await ComplaintsModel.find({solved:0}).count();
    res.json({Complaints:ComplaintData,count:count});
}

module.exports = {getComplains};