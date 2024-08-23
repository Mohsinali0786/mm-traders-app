const express = require('express')
// const router = express.Router()
const User = require('../models/userSchema')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const {sendVerificationEmail} = require("../utils/sendVerificationMail")
var crypto = require('crypto');


let jwtSecrete = `${process.env.JWT_SECRETE_KEY}`
// console.log('process.env.JWT_SECRETE_KEY',process.env.JWT_SECRETE_KEY)
const createToken = (email) => {
    console.log(jwtSecrete, 'SSSSSSSSSs')
    return jsonwebtoken.sign({ email }, `${process.env.JWT_SECRETE_KEY}`, { expiresIn: '1h' })
    // const emailToken = jsonwebtoken.sign({
    //     email: req.body.email
    // }, jwtSecrete, { expiresIn: '1h' });
}
const createUser = async (req, res) => {
    // const emailTransporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     port: 5000,
    //     secure: true,
    //     auth: {
    //         user: 'freelancers00786@gmail.com',
    //         pass: 'rgyy wudv hvpt memu'
    //     }
    // });
    // let token = createToken(req.body.email)
    // console.log('token',token)
    console.log('req.body', req.body)
    const  {name , email , password} =  req.body
    let result = await User.findOne({ email: req.body.email })
    console.log('result', result)
    if (result) return res.send({ success: false, message: 'This Email Exists in our database' })
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)
    let securePassword = await bcrypt.hash(req.body.password, salt)
    try {

        // const verificationUrl = `http://localhost:5000/api/verify-email/${token}`;
        // console.log(verificationUrl,'verificationUrl')
        // const mailOptions = {
        //     from: 'freelancers00786@gmail.com',
        //     to: req.body.email,
        //     subject: 'Verify Your Email',
        //     html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
        // };
        //  emailTransporter.sendMail(mailOptions,function(error, info){ 
        //     if (error) console.log(error,'errr'); 
        //     console.log('Email Sent Successfully',info); 
        //     console.log(info); 
        // });
        // res.send({success:true,message:'Registration successful, please verify your email.'})
        // res.send('Registration successful, please verify your email.')
        result = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            location: req.body.location,
            emailToken: crypto.randomBytes(64).toString("hex")
        })
        // console.log(res,'Userrrrrrrrrr')
        let message = await sendVerificationEmail(result).then((res)=>{
            return res
        }).catch((error)=>{
            return error
        })
        // console.log(result12,'result12')
        
        const token = createToken(result._id)
        res.send({ success: true , _id: result._id, name, email, token ,isVerified:result?.isVerified , emailSentmessage:message})

    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}

const verifyUser = async (req, res) => {
    console.log('req.body', req.body)

    try {
        const emailToken = req.body.emailToken
        if (!emailToken) return res.status(404).json("Email Token not found")
        let user = await User.findOne({ emailToken })

        console.log(user, 'Before Userr')
        if (user) {
            user.isVerified = true
            user.emailToken = null
            await user.save()
            console.log(user, 'After Userr')
            const token = createToken(user._id)
            res.status(200).json({
                success:true,
                message:"Email Verified",
                user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token,
                    isVerified: user?.isVerified
                }
            })
        }
        else {
           res.status(404).json("Email Verification Failed Invalid Token")
        }
    }
    catch (err) {
        console.log('Err', err)
       res.status(500).json(err.message)
    }
}
const loginUser = async (req, res) => {
    let email = req.body.email
    console.log('jsonwebtoken==>', jsonwebtoken)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let userData = await User.findOne({ email })
        if (!userData) return res.status(400).json({ errors: 'Email not exist' });
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) return res.status(400).json({ errors: 'Incorrect password' });
        const data = {
            user: {
                id: userData._id
            }
        }
        const authToken = jsonwebtoken.sign(data, jwtSecrete)
        return res.json({ success: true, authToken: authToken, userLogin: userData })
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}
const updateUserRole = async (req, res) => {
    console.log('Req.params', req.params)
    const { role } = req?.body
    try {
        // User.findByIdAndUpdate(req.params.id, { role }, function (err, data) {
        //     if (err) {
        //         return res.send({ success: false, err })
        //     }
        //     return res.send({ success: true, data })
        // })
        const user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { role },
            { new: true }
        );
        console.log('user Updates Res', user)
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}

const deleteUser = async (req, res) => {
    console.log('Req.params', req.params)
    const { role } = req?.body
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.send({ success: true, message: 'Deleted Successfully' })
        console.log('user Updates Res', user)
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false, message: 'Error in deleting record' })
    }
}
module.exports = { createUser, loginUser, updateUserRole, deleteUser, verifyUser };
// module.exports=router