const jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const {AdminModel} = require('../model/model');

const Login = async(req,res,next)=>{

     const adminData = await AdminModel.findOne({userName:req.body.username});
     if(adminData){
        const password = adminData.password;
        const tried = adminData.Tried;
        const id = adminData._id;

        if(tried<=10){
            if(password === req.body.password){
                const token = jwt.sign({ id }, jwtKey, { expiresIn: "48h" });
                res.json({message:'success',token:token});
            }else{
            const update = await AdminModel.updateOne({userName:req.body.username},{Tried:tried+1});
            res.json({message:'AUTH_FAILED'});
            }
        }else{
            res.json({message:'ADMIN_BLOCKED'});
        }
     }else{
        res.json({message:'AUTH_FAILED'});
     }

}

module.exports = {Login};