const {ComplaintsModel} = require('../model/model');

const setComplains = async(req,res,next)=>{
   const {id,solution} = req.body;

   const getComplains = await ComplaintsModel.findOne({_id:id});

   if(getComplains){
       const updateSolution = await ComplaintsModel.updateOne({_id:id},{solution:solution,solved:1});
       res.json({message:'success'});
   }else{
       res.json({message:'DATA_NOT_EXIST'});
   }


}

module.exports = {setComplains};