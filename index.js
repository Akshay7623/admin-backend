require('dotenv').config();
require('./config');
const express  = require('express');
const cors = require('cors');
const getUsersRoute = require('./routes/getAllUserRoute.js');
const login = require('./routes/loginRoute.js');
const authAdmin = require('./routes/authAdminRoute.js');
const SearchUser = require('./routes/searchUserRoute.js');
const UserActionRoute = require('./routes/UserActionRoute.js');
const updateWalletRoute = require('./routes/updateWalletRoute.js');
const showUPIRoute = require('./routes/showUPIRoute.js');
const addUPIRoute = require('./routes/addUPIRoute.js');
const deleteUPIRoute = require('./routes/deleteUPIRoute.js');
const getRechargeRoute = require('./routes/getRechargeRoute.js');
const approveRechargeRoute = require('./routes/approveRechargeRoute.js');
const rejectRechargeRoute = require('./routes/rejectRechargeRoute.js');
const searchRechargeRoute = require('./routes/searchRechargeRoute.js');
const getWithdrawRoute = require('./routes/getWithdrawRoute.js');
const approveWithdraw = require('./routes/approveWithdrawRoute.js');
const rejectWithdraw = require('./routes/rejectWithdrawRoute.js');
const approveRazorpay = require('./routes/approveRazorpayRoute.js');
const searchwithdrawRoute = require('./routes/searchWithdrawRoute.js');
const getBetDataRoute = require('./routes/getBetDataRoute.js');
const updateBetDataRoute = require('./routes/updateBetDataRoute.js');
const getAllTargets = require('./routes/getAllTargetsRoute.js');
const setActiveTarget = require('./routes/setActiveTargetRoute.js');
const getComplains = require('./routes/getComplainsRoute.js');
const setComplains = require('./routes/setComplainsRoute.js');
const getBonusRecord = require('./routes/getBonusRoute.js');
const approveBonus = require('./routes/approveBonusRoute.js');
const rejectBonus = require('./routes/rejectBonusRoute.js');
const path = require('path');

const port = 5500;
const app = express();
app.use(express.json());
app.use(cors());

//mongodb://Akshay:Akshay9978@64.227.129.191:27017/admin?authSource=admin

app.use('/api/getalluser',getUsersRoute);
app.use('/api/login',login);
app.use('/api/authadmin',authAdmin);
app.use('/api/searchuser',SearchUser);
app.use('/api/useraction',UserActionRoute);
app.use('/api/updatewallet',updateWalletRoute);
app.use('/api/showupi',showUPIRoute);
app.use('/api/addupi',addUPIRoute);
app.use('/api/delete',deleteUPIRoute);
app.use('/api/getrecharge',getRechargeRoute);
app.use('/api/approverecharge',approveRechargeRoute);
app.use('/api/rejectrecharge',rejectRechargeRoute);
app.use('/api/searchrecharge',searchRechargeRoute);
app.use('/api/getwithdraw',getWithdrawRoute);
app.use('/api/approvewithdraw',approveWithdraw);
app.use('/api/rejectwithdraw',rejectWithdraw);
app.use('/api/approverazorpay',approveRazorpay);
app.use('/api/searchwithdraw',searchwithdrawRoute);
app.use('/api/getbetdata',getBetDataRoute);
app.use('/api/updatebet',updateBetDataRoute);
app.use('/api/getalltargets',getAllTargets);
app.use('/api/setactivetarget',setActiveTarget);
app.use('/api/getcomplains',getComplains);
app.use('/api/setcomplains',setComplains);
app.use('/api/getbonusrecord',getBonusRecord);
app.use('/api/approvebonus',approveBonus);
app.use('/api/rejectbonus',rejectBonus);


app.use(express.static(__dirname + '/build'));
app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});