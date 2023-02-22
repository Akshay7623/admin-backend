exports = function(changeEvent) {
    const server = context.services.get('Cluster0').db("test").collection("parityrecords");
      const user = context.services.get('Cluster0').db("test").collection("users");
      const docId = changeEvent.documentKey._id;
      
      if(changeEvent.operationType === "insert"){
          const getBetDoc = async()=>{
          return await server.find({_id:docId}).toArray();
        }
         getBetDoc().then((betDoc)=>{
         let userId = betDoc[0].userId;
         let total_amount = betDoc[0].total_amount;
      
         
          const getUserDoc = async ()=>{
          return await user.find({_id:BSON.ObjectId(userId)}).toArray();
          }
          
          const updateWallet1 = async(refcode)=>{
           const MainWallet = await user.updateOne({ReferCode:refcode},{$inc:{bonusWallet:(total_amount*0.015)}});
           const wallet1 = await user.updateOne({ReferCode:refcode},{$inc:{bonusWallet1:(total_amount*0.015)}});
         }
         
          const updateWallet2 = async(refcode)=>{
           const MainWallet = await user.updateOne({ReferCode:refcode},{$inc:{bonusWallet:(total_amount*0.005)}});
           const wallet2 = await user.updateOne({ReferCode:refcode},{$inc:{bonusWallet2:(total_amount*0.005)}});
          }
        
          const getGrandParentRefCode = async(parentInviteCode)=>{
           return await user.find({ReferCode:parentInviteCode}).toArray();
          }
         
          getUserDoc().then((userDoc)=>{
          let ReferCode = userDoc[0].ReferCode;
          let inviteCode = userDoc[0].inviteCode;
          updateWallet1(inviteCode);
    
          getGrandParentRefCode(inviteCode).then((grandParentData)=>{
            if(grandParentData[0].inviteCode !== undefined || grandParentData[0].inviteCode !==""){
              updateWallet2(grandParentData[0].inviteCode);
            }
          });
          
          });
       });
      }else{
        const getBetDoc = async()=>{
        return await server.find({_id:docId}).toArray();
        }
        
      const updateWallet = async(userId,winBal)=>{
        console.log('win bal is ', winBal);
        await user.updateOne({_id:BSON.ObjectId(userId)},{$inc:{wallet:winBal}});
        }
        
      getBetDoc().then((betDoc)=>{
       let userId = betDoc[0].userId;
       let betType = betDoc[0].betType;
       let total_amount = betDoc[0].total_amount;
       let result = betDoc[0].result;
       let value = betDoc[0].value;
       let win_number = betDoc[0].win_number;
       
        const getUserDoc = async ()=>{
        return await user.find({_id:BSON.ObjectId(userId)}).toArray();
        }
        
        getUserDoc().then((userDoc)=>{
        let wallet = userDoc[0].wallet;
        
        if(result==='win'){
         if(betType === 'number'){
            const winBal =  (total_amount - ((total_amount*2)/100))*9;
            updateWallet(userId,winBal);
         }else{
          
          if(win_number === 0){
            if(value === 'Violet'){
            const winBal =  (total_amount - ((total_amount*2)/100))*4.5;
            updateWallet(userId,winBal);
            }else if(value === 'Red'){
            const winBal =  (total_amount - ((total_amount*2)/100))*1.5;
            updateWallet(userId,winBal);
            }
          }else if(win_number === 5){
            if(value === 'Violet'){
            const winBal =  (total_amount - ((total_amount*2)/100))*4.5;
            updateWallet(userId,winBal);
            }else if(value === 'Green'){
            const winBal =  (total_amount - ((total_amount*2)/100))*1.5;
            updateWallet(userId,winBal);
            }
          }else{
            const winBal =  (total_amount - ((total_amount*2)/100))*2;
            updateWallet(userId,winBal);
          }
         }
        }
        });
     });
      }
  };