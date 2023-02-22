const {RegisterModel}  = require('../model/model');

const userAction = async(req,res,next)=>{
    
    const getUser = await RegisterModel.findOne({_id:req.body.id})

    if(getUser){
        if(req.body.event === 'disable'){
            const updateUser = await RegisterModel.updateOne({_id:req.body.id},{isV:2});
            if(updateUser.modifiedCount){
                res.json({message:'success'});
            }else{
                res.json({message:'FAILED'});
            }
        }else{
            const updateUser = await RegisterModel.updateOne({_id:req.body.id},{isV:1});
            if(updateUser.modifiedCount){
                res.json({message:'success'});
            }else{
                res.json({message:'FAILED'});
            }
        }
    }else{
        res.json({message:'USER_NOT_EXIST'});
    }
    
}

module.exports = {userAction};