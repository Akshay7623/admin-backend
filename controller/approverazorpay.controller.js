const {WithdrawModel} = require('../model/model');
const request = require("request");
const approveRazorpay =  async (req,res,next)=>{
    const withdrawData = await WithdrawModel.findOne({$and:[{_id:req.body.id},{paymentStatus:0}]});
    if(withdrawData){
    const {time} = withdrawData;

        const {userId,name,email,mobile,source,ifsc,paymentStatus,withdrawAmount} = withdrawData;
        if(withdrawAmount<1000){
            amount = withdrawAmount - 30;
        }else{
            amount = withdrawAmount - Math.floor((withdrawData*3)/100);
        }

        const reqUrl = "https://api.razorpay.com/v1/payouts";
        const headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization:
            "Basic cnpwX2xpdmVfT0V0cVZoZ0R1TGplNUQ6bDhEMUtoRjlnMEpSRHVidDlnWGl0QlVK",
        };

        if(ifsc === '0'){
            payload = {
                account_number: "4564563113553412",
                amount: 100 * amount,
                currency: "INR",
                mode: "UPI",
                purpose: "payout",
                fund_account: {
                  account_type: "vpa",
                  vpa: {
                    address: source,
                  },
                  contact: {
                    name: name,
                    email: email,
                    contact: mobile,
                    type: "customer",
                    reference_id: userId,
                    notes: {
                      notes_key_1: "Tea, Earl Grey, Hot",
                      notes_key_2: "Tea, Earl Grey… decaf.",
                    },
                  },
                },
                queue_if_low_balance: true,
                reference_id: userId,
                narration: 'payout',
                notes: {
                  userId: userId,
                  orderId: userId,
                },
              };
        }else{
                payload = {
                  account_number: "4564563113553412",
                  amount: 100 * amount,
                  currency: "INR",
                  mode: "IMPS",
                  purpose: "payout",
                  fund_account: {
                    account_type: "bank_account",
                    bank_account: {
                      name: name,
                      ifsc: ifsc,
                      account_number: source,
                    },
                    contact: {
                      name: name,
                      email: email,
                      contact: mobile,
                      type: "customer",
                      reference_id: userId,
                      notes: {
                        notes_key_1: "Tea, Earl Grey, Hot",
                        notes_key_2: "Tea, Earl Grey… decaf.",
                      },
                    },
                  },
                  queue_if_low_balance: true,
                  reference_id: "Acme Transaction ID 12345",
                  narration: "Acme Corp Fund Transfer",
                  notes: {
                    userId: userId,
                    orderId: userId,
                  },
                };
        }

        request.post( { url: reqUrl,
            headers: headersList,
            body: payload,
            json: true, },
         async (err, resp, body) => {
            if (err) {
              console.error(err);
              return;
            }
            // console.log(body);
    
            if (body.status === "processing" || body.status === 'queued' ) {
              //update database here
             const updateWithdraw = await WithdrawModel.updateOne({_id:req.body.id},{paymentStatus:1});
             const transaction = await AllTransactionModel.updateOne({$and:[{userId:userId},{time:time}]},{transactionStatus:1});
             res.json({message:'success'});
            }else{
             res.json({message:'ERROR'});
            }

          } );

    }else{
        res.json({message:'INVALID_DATA'});
    }
}

module.exports = {approveRazorpay};