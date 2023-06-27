const { PredictionModel, ParityModel, SapreModel, BconeModel, EmerdModel,} = require("../model/model");

const makePrediction = async (req, res, next) => {

  let { server, period, isFirst, color, firstPeriod } = req.body;
  const data = await PredictionModel.findOne({ $and: [{ server: server }, { period: period }], });

  if (data) {
    await PredictionModel.updateOne({ $and: [{ server: server }, { period: period }] }, { predict: color });
  } else {
    let PredictData = PredictionModel({ server: server, period: period, predict: color,});
    await PredictData.save();
  }

  if (isFirst) {
    res.json({ message: "success" });
  } else {
    
    let predictedData = await PredictionModel.findOne({ $and: [{ period: { $gte: firstPeriod } }, { period: { $lte: period } }, { result: "" }, { server: server }]});
    if (predictedData) {

      let documentPeriod = predictedData.period;
      let predictedResultcolor = predictedData.predict;
      let resultColor;
      let result = null;

        if(server === 'parity'){
          result = await ParityModel.findOne({ Period: documentPeriod });
        }else if(server === 'sapre'){
          result = await SapreModel.findOne({ Period: documentPeriod });
        }else if(server === 'bcone'){
          result = await BconeModel.findOne({ Period: documentPeriod });
        }else if(server === 'emerd'){
          result = await EmerdModel.findOne({ Period: documentPeriod });
        }

      if (result) {
        let win_number = result.win_number;
        if ( win_number === 0 || win_number === 2 || win_number === 4 || win_number === 6 || win_number === 8 ) {
          resultColor = "red";
        } else {
          resultColor = "green";
        }

        if (resultColor === predictedResultcolor) {
          await PredictionModel.updateOne( { $and: [{ period: documentPeriod }, { server: server }] }, { result: "Win" } );
        } else {
          await PredictionModel.updateOne( { $and: [{ period: documentPeriod }, { server: server }] }, { result: "Lose" } );
        }

      } else {
        // console.log('data not found in  result server so here we come !');
      }
    } else {
      // console.log("accessing buy putting future timeframe so here we come OR can be data not found in prediction database !");
    }

    let allData = await PredictionModel.find({$and:[{ period: { $gte: firstPeriod } }, { period: { $lt: period } }, { result: {$ne:""} }, { server: server }]});
    res.json({data:allData, message:"success"});
    
  }
};

module.exports = { makePrediction };
