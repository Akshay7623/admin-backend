const {PandLModel,AllTargetModel} = require('../model/model');

const getAllTargets = async(req,res,next)=>{
    
    function addMinutes(date, minutes) {
        const dateCopy = new Date(date);
        dateCopy.setMinutes(date.getMinutes() + minutes);
        return dateCopy;
      }

    const getPeriod = () => {
        const date = new Date();
        let diff = (new Date()).getTimezoneOffset();
        let sum = 330 + diff;
        const newDate = addMinutes(date, sum);
        const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
        let y = newDate.getFullYear();
        let m = months[newDate.getMonth()];
        let d = days[newDate.getDate()];
        const min = ((newDate.getHours()) * 60) + (newDate.getMinutes());
        let minBythree = Math.floor(min / 3) + 1;
        if (minBythree.toString().length === 1) {
          minBythree = `00${minBythree}`;
        } else if (minBythree.toString().length === 2) {
          minBythree = `0${minBythree}`
        }
        return `${y}${m}${d}${minBythree}`;
      }
      
    const getToday = ()=>{
      const date = new Date();
      let diff = (new Date()).getTimezoneOffset();
      let sum = 330 + diff;
      const newDate = addMinutes(date, sum);
      const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      const days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
      let y = newDate.getFullYear();
      let m = months[newDate.getMonth()];
      let d = days[newDate.getDate()];
      return `${d}${m}${y}`;
    }

    const {server} = req.body;
    let dateStr = getToday();
    let curretTarget,completedTargets,count;
    switch (server) {
        case 'parity':
            completedTargets = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]});
            count = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]}).count();
            curretTarget = await PandLModel.findOne({$and:[{server:server},{dateStr:dateStr}]});
            res.json({curretTarget:curretTarget,completedTargets:completedTargets,count:count});
            break;
        case 'sapre':
            completedTargets = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]});
            count = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]}).count();
            curretTarget = await PandLModel.findOne({$and:[{server:server},{dateStr:dateStr}]});
            res.json({curretTarget:curretTarget,completedTargets:completedTargets,count:count});
            break;
        case 'bcone':
            completedTargets = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]});
            count = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]}).count();
            curretTarget = await PandLModel.findOne({$and:[{server:server},{dateStr:dateStr}]});
            res.json({curretTarget:curretTarget,completedTargets:completedTargets,count:count});
            break;
        case 'emerd':
            completedTargets = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]});
            count = await AllTargetModel.find({$and:[{server:server},{dateStr:dateStr}]}).count();
            curretTarget = await PandLModel.findOne({$and:[{server:server},{dateStr:dateStr}]});
            res.json({curretTarget:curretTarget,completedTargets:completedTargets,count:count});
            break;
        default:
            res.json({message:'INVALID_DATA_SENT'});
            break;
    }

}


module.exports = {getAllTargets};