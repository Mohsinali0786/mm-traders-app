const mongoose = require("mongoose");
const { Schema } = mongoose;

// old work
// const partyDataSchemaModel=new Schema({
//     // id:{
//     //     type:String,
//     //     required:true
//     // },
//     partyName:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:Date,
//         default:Date.now()
//     },
//     userId:{
//         type:Schema.Types.ObjectId,
//         ref:'user'
//     },
//     hisabKitab:[],
//     type:{
//         type:String,
//         enum : ['SELL','PURCHASER'],
//         // default: 'SELLER'
//     },
//       unitType:{
//         type:String,
//         enum : ['Kg','Metre','Yard'],
//         // default: 'SELLER'
//     }
// })

// new Work

const partyDataSchemaModel = new Schema({
  // id:{
  //     type:String,
  //     required:true
  // },
  // partyName:{
  //     type:String,
  //     required:true
  // },
  // date:{
  //     type:Date,
  //     default:Date.now()
  // },
  partyId: {
    type: Schema.Types.ObjectId,
    ref: "party",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  hisabKitab: [],
  type: {
    type: String,
    enum: ["SELL", "PURCHASER"],
    // default: 'SELLER'
  },
  unitType: {
    type: String,
    enum: ["Kg", "Metre", "Yard"],
    // default: 'SELLER'
  },
});
module.exports = mongoose.model("partyData", partyDataSchemaModel);
