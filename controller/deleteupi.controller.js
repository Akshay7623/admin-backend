const {UPIIDModel} = require('../model/model');

const deleteUPI = async(req,res,next)=>{
   const getID = await UPIIDModel.findOne({_id:req.body.id});
   if(getID){
    const del = await UPIIDModel.deleteOne({_id:req.body.id});
    res.json({message:'success'});
   }else{
      res.json({message:'DATA_NOT_EXIST'});
   }
}

module.exports = {deleteUPI};