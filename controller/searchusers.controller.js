const {RegisterModel} = require('../model/model');

const searchUsers = async(req,res,next)=>{
    let users,count;
    const {search} = req.body;

    users = await RegisterModel.find({ReferCode:{$regex: search }}).sort({time: -1}).limit(10);
    count = await RegisterModel.find({ReferCode:{$regex: search }}).count();
    res.json({users:users,count:count});

}

module.exports = {searchUsers};