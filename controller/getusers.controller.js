const {RegisterModel} = require('../model/model');

const getUsers = async(req,res,next)=>{
    let users,count;
    const {firstBetTime,lastTime,type} = req.body;

    if(type === 'next'){
        users = await RegisterModel.find({$and:[{time:{ $lt: lastTime }},{$or:[{isV:1},{isV:2}]}]}).sort({time: -1}).limit(10);
      }else{
        users = await RegisterModel.find({$and:[{time:{ $gt: firstBetTime }},{$or:[{isV:1},{isV:2}]}]}).sort({time: 1}).limit(10);
      }

      count = await RegisterModel.find({isV:1}).count();

      res.json({users:users,count:count});

}

module.exports = {getUsers};