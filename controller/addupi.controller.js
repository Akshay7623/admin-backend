const {UPIIDModel} = require('../model/model');

const addUPI = async(req,res,next)=>{
   const getID = await UPIIDModel.findOne({upi:req.body.upi});
   if(getID){
    res.json({message:'DATA_EXIST'});
   }else{
    const add = UPIIDModel({upi:req.body.upi});
    const saveUpi = await add.save();
    res.json({message:'success'});
   }
}

module.exports = {addUPI};