const {UPIIDModel} = require('../model/model');

const showUPI = async(req,res,next)=>{
   const getID = await UPIIDModel.find();
   res.json(getID);
}

module.exports = {showUPI};