const {ParityModel,SapreModel,BconeModel,EmerdModel} = require('../model/model');

const getBetData = async(req,res,next)=>{
    const {server} = req.body;

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

    let currPeriod = getPeriod();
    let result,count;

    switch (server) {
        case 'parity':
            result = await ParityModel.find({Period:currPeriod});
            count = await ParityModel.find({Period:currPeriod}).count();
            break;
        case 'sapre':
            result = await SapreModel.find({Period:currPeriod});
            count = await ParityModel.find({Period:currPeriod}).count();
            break;
        case 'bcone':
            result = await BconeModel.find({Period:currPeriod});
            count = await ParityModel.find({Period:currPeriod}).count();
            break;
        case 'emerd':
            result = await EmerdModel.find({Period:currPeriod});
            count = await ParityModel.find({Period:currPeriod}).count();
            break;
        default:
            break;
    }

    res.json({result:result,count:count});

    
}

module.exports = {getBetData};