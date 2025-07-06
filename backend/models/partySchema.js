const mongoose =require('mongoose')
const {Schema}=mongoose

const partySchema=new Schema({
    // id:{
    //     type:String,
    //     required:true
    // },
    partyName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    hisabKitab:[],
    type:{
        type:String,
        enum : ['SELL','PURCHASER'],
        // default: 'SELLER'
    }
})
module.exports=mongoose.model('party',partySchema)