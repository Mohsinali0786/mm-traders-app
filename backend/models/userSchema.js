const mongoose =require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    emailToken:{
        type:String
    },
    partyId:{
        type:Array,
    }
    // orders:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'Order'
    // }],
    // addresses:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'Address'
    // }]
})
module.exports=mongoose.model('user',userSchema)