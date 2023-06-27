const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    mobile: Number,
    loginPassword: String,
    withdrawPassword: String,
    time:Number,
    inviteCode:String,
    ReferCode:String,
    otp:Number,
    wallet:{
      type:Number,
      default:0
    },
    bonusWallet:{
      type:Number,
      default:0
    },
    isV:{
      type:Number,
      default:0
    },
    OtpTried:{
      type:Number,
      default:0
    },
    bonusWallet1:{
      type:Number,
      default:0
    },
    bonusWallet2:{
      type:Number,
      default:0
    },
    totalPeople1:{
      type:Number,
      default:0
    },
    totalPeople2:{
      type:Number,
      default:0
    },
    bonusDone:{
      type:Number,
      default:0
    }
  });

const ForgotpassSchema = new mongoose.Schema({
  mobile:Number,
  time:Number,
  otp:Number,
  OtpTried:{
    type:Number,
    default:0
  }

})

const addBankSchema = new mongoose.Schema({
   userId:String,
   ifsc:String,
   customerName:String,
   mobile:Number,
   email:String,
   bankName:String,
   bankAccount:String
});

const addUPISchema = new mongoose.Schema({
  userId:String,
  upi:String,
  customerName:String,
  mobile:Number,
  email:String
});

const KYCSchema = new mongoose.Schema({
  userId:String,
  name:String,
  mobile:Number,
  upi:String,
  email:String
});

const RechargeSchema = new mongoose.Schema({
  userId:String,
  UTR:{
    type:String,
    default:''
  },
  name:String,
  email:String,
  upi:String,
  ToPayUpi:String,
  mobile:Number,
  time:Number,
  paymentStatus:{
    type:Number,
    default:0
  },
  rechargeAmount:Number
});

const UPIIDSchema = new mongoose.Schema({
  upi:String
});

const WithdrawSchema = new mongoose.Schema({
  userId:String,
  name:String,
  email:String,
  mobile:Number,
  source:String,
  ifsc:{
    type:String,
    default:'0'
   },
  bankName:String,
  time:Number,
  paymentStatus:{
    type:Number,
    default:0
  },
  withdrawAmount:Number
});

const BetParitySchema = new mongoose.Schema({
  userId:String,
  Period:String,
  time:Number,
  betType:String,
  value:String,
  no_of_orders:Number,
  contract_amount:Number,
  total_amount:Number,
  win_number:{
  type:Number,
  default:''
  },
  result:{
    type:String,
    default:'wait'
  }

});

const BetSapreSchema = new mongoose.Schema({
  userId:String,
  Period:String,
  time:Number,
  betType:String,
  value:String,
  no_of_orders:Number,
  contract_amount:Number,
  total_amount:Number,
  win_number:{
    type:Number,
    default:''
    },
  result:{
    type:String,
    default:'wait'
  }

});

const BetBconeSchema = new mongoose.Schema({
  userId:String,
  Period:String,
  time:Number,
  betType:String,
  value:String,
  no_of_orders:Number,
  contract_amount:Number,
  total_amount:Number,
  win_number:{
    type:Number,
    default:''
    },
  result:{
    type:String,
    default:'wait'
  }

});

const BetEmerdSchema = new mongoose.Schema({
  userId:String,
  Period:String,
  time:Number,
  betType:String,
  value:String,
  no_of_orders:Number,
  contract_amount:Number,
  total_amount:Number,
  win_number:{
    type:Number,
    default:''
    },
  result:{
    type:String,
    default:'wait'
  }

});

const ResultParitySchema = new mongoose.Schema({
  Period:String,
  totalP:Number,
  win_number:Number,
  price:Number,
  isChanged:Number,
  show:Number,
  BetMoney:Array
});

const ResultSapreSchema = new mongoose.Schema({
  Period:String,
  totalP:Number,
  win_number:Number,
  price:Number,
  isChanged:Number,
  show:Number,
  BetMoney:Array
});

const ResultBconeSchema = new mongoose.Schema({
  Period:String,
  totalP:Number,
  win_number:Number,
  price:Number,
  isChanged:Number,
  show:Number,
  BetMoney:Array
});

const ResultEmerdSchema = new mongoose.Schema({
  Period:String,
  totalP:Number,
  win_number:Number,
  price:Number,
  isChanged:Number,
  show:Number,
  BetMoney:Array
});

const PandLSchema = new mongoose.Schema({
  server:String,
  dateStr:String,
  ProfitOrLoss:Number,
  Target:Number
});

const AdminSchema = new mongoose.Schema({
  userName:String,
  password:String,
  Tried:Number
});

const AllTargetSchema = new mongoose.Schema({
  server:String,
  dateStr:String,
  Period:Number,
  ProfitOrLoss:Number,
  Target:Number
});

const ComplaintSchema = new mongoose.Schema({
  userId:String,
  type:String,
  contact:String,
  desc:String,
  solved:{
    type:Number,
    default:0
  },
  time:Number,
  solution:{
    type:String,
    default:''
  }
});

const AllTransactionSchema = new mongoose.Schema({
  userId:String,
  type:String,
  time:Number,
  transactionStatus:Number,
  amount:Number
});

const ApplyBonusSchema = new mongoose.Schema({
  userId:String,
  amount:Number,
  time:Number
});

const PredictionSchema = new mongoose.Schema({
  server:String,
  period:String,
  predict:String,
  result:{
    type:String,
    default:''
  }
});

const RegisterModel = new mongoose.model('users',RegisterSchema);
const ForgotpassModel = new mongoose.model('forgotpass',ForgotpassSchema);
const addBankModel = new mongoose.model('banks',addBankSchema);
const addUPIModel = new mongoose.model('upis',addUPISchema)
const KYCModel = new mongoose.model('kycs',KYCSchema);
const RechargeModel = new mongoose.model('recharges',RechargeSchema);
const WithdrawModel = new mongoose.model('withdraws',WithdrawSchema);
const BetParityModel = new mongoose.model('parityRecords',BetParitySchema);
const BetSapreModel = new mongoose.model('sapreRecords',BetSapreSchema);
const BetBconeModel = new mongoose.model('bconeRecords',BetBconeSchema);
const BetEmerdModel = new mongoose.model('emerdRecords',BetEmerdSchema);
const ParityModel = new mongoose.model('parityresults',ResultParitySchema);
const SapreModel = new mongoose.model('sapreresults',ResultSapreSchema);
const BconeModel = new mongoose.model('bconeresults',ResultBconeSchema);
const EmerdModel = new mongoose.model('emerdresults',ResultEmerdSchema);
const PandLModel = new mongoose.model('datepandls',PandLSchema);
const AdminModel = new mongoose.model('admindatas',AdminSchema);
const UPIIDModel = new mongoose.model('allupis',UPIIDSchema);
const AllTargetModel = new mongoose.model('alltargets',AllTargetSchema);
const ComplaintsModel = new mongoose.model('complaints',ComplaintSchema);
const AllTransactionModel = new mongoose.model('alltransactions',AllTransactionSchema);
const ApplyBonusModel = new mongoose.model('applybonuses',ApplyBonusSchema);
const PredictionModel = new mongoose.model('predictions',PredictionSchema);

module.exports = {RegisterModel,ForgotpassModel,addBankModel,addUPIModel,KYCModel,RechargeModel,WithdrawModel,BetParityModel,BetSapreModel,BetBconeModel,BetEmerdModel,ParityModel,SapreModel,BconeModel,EmerdModel,PandLModel,AdminModel,UPIIDModel,AllTargetModel,AllTransactionModel,ComplaintsModel,ApplyBonusModel,PredictionModel};