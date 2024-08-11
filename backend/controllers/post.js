const express =require('express')
// const router = express.Router()
const User=require('../models/userSchema')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const jwtSecrete="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTQwMjc3MiwiaWF0IjoxNzE1NDAyNzcyfQ.o-qBsGeYU7j98HVVLEv8X9D92KX6U-8jw_NT1Yud16A"


const createUser = async (req,res)=>{
    let result = await User.findOne({email:req.body.email})
    console.log('result',result)
    if(result) return res.send({success:false ,message:'This Email Exists in our database'})
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const salt = await bcrypt.genSalt(10)
      let securePassword = await bcrypt.hash(req.body.password,salt)
    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:securePassword,
            location:req.body.location,
        })
        res.send({success:true})
    }
    catch(err){
        console.log('Err',err)
        res.send({success:false})
    }
}

const loginUser = async (req,res)=>{
    let email = req.body.email
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    try{
        let userData= await User.findOne({email})
        if(!userData) return res.status(400).json({ errors: 'Email not exist' });
        const pwdCompare =await bcrypt.compare(req.body.password , userData.password)
        if(!pwdCompare) return res.status(400).json({ errors: 'Incorrect password' });
        const data={
            user:{
                id:userData._id
            }
        }
        const authToken = jsonwebtoken.sign(data , jwtSecrete)
        return res.json({success:true , authToken:authToken , userLogin:userData})
    }
    catch(err){
        console.log('Err',err)
        res.send({success:false})
    }
}
const updateUserRole = async (req,res)=>{
    console.log('Req.params' , req.params)
    const { role } = req?.body
    try{
        // User.findByIdAndUpdate(req.params.id, { role }, function (err, data) {
        //     if (err) {
        //         return res.send({ success: false, err })
        //     }
        //     return res.send({ success: true, data })
        // })
        const user = await User.findByIdAndUpdate(
            {_id: req.params.id}, 
            {role},
            {new: true} 
         );
         console.log('user Updates Res' , user)
    }
    catch(err){
        console.log('Err',err)
        res.send({success:false})
    }
}

const deleteUser = async (req,res)=>{
    console.log('Req.params' , req.params)
    const { role } = req?.body
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.send({success:true ,message:'Deleted Successfully'})
         console.log('user Updates Res' , user)
    }
    catch(err){
        console.log('Err',err)
        res.send({success:false , message:'Error in deleting record'})
    }
}
module.exports = { createUser , loginUser , updateUserRole ,deleteUser};
// module.exports=router