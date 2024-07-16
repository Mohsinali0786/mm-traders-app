const express =require('express')
const User=require('../models/userSchema')

const getUser = async (req,res)=>{
    try{
        let data = await User.find({})
        console.log(data,'data')
        res.send({success:true , data:data})
    }
    catch(err){
        console.log('Err',err)
        res.send({success:false , message : 'No record found'})
    }
}

module.exports = { getUser };
// module.exports=router