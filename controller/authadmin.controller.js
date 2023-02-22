const {AdminModel} = require('../model/model');

const auth = async (req,res,next)=>{
     const AdminData = await AdminModel.findOne({_id:req.body.userId});
     if(AdminData){
         res.json({message:'success'});
     }else{
         res.json({message:false});
     }
}

module.exports = {auth};