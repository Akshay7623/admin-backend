const {ParityModel,SapreModel,BconeModel,EmerdModel,AllTargetModel,PandLModel} = require('../model/model');

const updateBetData = async(req,res,next)=>{
    const {server,number} = req.body;

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

    const ProfitLossByNumber = (betArr,num)=>{
        const sumOfAll = betArr.reduce((partialSum, a) => partialSum + a, 0);
        let PandL;
          if(num === 1 || num === 3 || num === 7 || num === 9){
            PandL = sumOfAll - ((betArr[num]*10) + (betArr[10]*2));
          }else if(num === 2 || num === 4 || num === 6 || num === 8){
            PandL = sumOfAll - ((betArr[num]*10) + (betArr[12]*2));
          }else if(num === 0){
            PandL = sumOfAll - ((betArr[num]*10) + (betArr[11]*5) + (betArr[11]*1.5));
          }else{
            PandL = sumOfAll - ((betArr[num]*10) + (betArr[11]*5) + (betArr[12]*1.5));
          }
          return PandL;
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

    let currPeriod = getPeriod();
    let dateStr = getToday();
    let result,Period;
    switch (server) {
        case 'parity':
            result = await ParityModel.findOne({Period:currPeriod});
            if(result){
                profitLoss = ProfitLossByNumber(result.BetMoney,number);
                const updateBet = await ParityModel.updateOne({Period:currPeriod},{win_number:number,isChanged:1});
                const targetDoc = await AllTargetModel.findOne({$and:[{server:server},{Period:currPeriod}]});
                if(targetDoc){
                  const updateTargetDoc = await AllTargetModel.updateOne({$and:[{server:server},{Period:currPeriod}]},{Target:0,ProfitOrLoss:profitLoss});
                }else{
                  const datePL = AllTargetModel({server:server,dateStr:dateStr,ProfitOrLoss:profitLoss,Target:0,Period:currPeriod})
                  const savePandL = await datePL.save();
                }
                res.json({message:'success'});
            }else{
                res.json({message:'failed'});
            }
            break;
        case 'sapre':
            result = await SapreModel.findOne({Period:currPeriod});
            if(result){
                profitLoss = ProfitLossByNumber(result.BetMoney,number);
                const updateBet = await SapreModel.updateOne({Period:currPeriod},{win_number:number,isChanged:1});
                const targetDoc = await AllTargetModel.findOne({$and:[{server:server},{Period:currPeriod}]});
                if(targetDoc){
                  const updateTargetDoc = await AllTargetModel.updateOne({$and:[{server:server},{Period:currPeriod}]},{Target:0,ProfitOrLoss:profitLoss});
                }else{
                  const datePL = AllTargetModel({server:server,dateStr:dateStr,ProfitOrLoss:profitLoss,Target:0,Period:currPeriod})
                  const savePandL = await datePL.save();
                }
                res.json({message:'success'});
            }else{
                res.json({message:'failed'});
            }
            break;
        case 'bcone':
            result = await BconeModel.findOne({Period:currPeriod});
            if(result){
                profitLoss = ProfitLossByNumber(result.BetMoney,number);
                const updateBet = await BconeModel.updateOne({Period:currPeriod},{win_number:number,isChanged:1});
                const targetDoc = await AllTargetModel.findOne({$and:[{server:server},{Period:currPeriod}]});
                if(targetDoc){
                  const updateTargetDoc = await AllTargetModel.updateOne({$and:[{server:server},{Period:currPeriod}]},{Target:0,ProfitOrLoss:profitLoss});
                }else{
                  const datePL = AllTargetModel({server:server,dateStr:dateStr,ProfitOrLoss:profitLoss,Target:0,Period:currPeriod})
                  const savePandL = await datePL.save();
                }
                res.json({message:'success'});
            }else{
                res.json({message:'failed'});
            }
            break;
        case 'emerd':
            result = await EmerdModel.findOne({Period:currPeriod});
            if(result){
                profitLoss = ProfitLossByNumber(result.BetMoney,number);
                const updateBet = await EmerdModel.updateOne({Period:currPeriod},{win_number:number,isChanged:1});
                const targetDoc = await AllTargetModel.findOne({$and:[{server:server},{Period:currPeriod}]});
                if(targetDoc){
                  const updateTargetDoc = await AllTargetModel.updateOne({$and:[{server:server},{Period:currPeriod}]},{Target:0,ProfitOrLoss:profitLoss});
                }else{
                  const datePL = AllTargetModel({server:server,dateStr:dateStr,ProfitOrLoss:profitLoss,Target:0,Period:currPeriod})
                  const savePandL = await datePL.save();
                }
                res.json({message:'success'});
            }else{
                res.json({message:'failed'});
            }
            break;
        default:
            break;
    }
}

module.exports = {updateBetData};