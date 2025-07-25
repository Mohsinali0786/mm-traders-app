const express = require('express')
const mongoose = require("mongoose")
// const router = express.Router()
const User = require('../models/userSchema')
const Party = require('../models/partySchema')

const { generateToken } = require('../config/jwtToken')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const { sendVerificationEmail } = require("../utils/sendVerificationMail")
var crypto = require('crypto');
let jwtSecrete = `${process.env.JWT_SECRETE_KEY}`
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
    const { name, email, password } = req.body
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
        // sendVerificationEmail(result).then((res)=>{
        //     return res
        // }).catch((error)=>{
        //     return error
        // })
        sendVerificationEmail(result)
        // let message = await sendVerificationEmail(result).then((res)=>{
        //     return res
        // }).catch((error)=>{
        //     return error
        // })
        // console.log(result12,'result12')

        const token = generateToken(result._id)
        res.send({ success: true, _id: result._id, name, email, token, isVerified: result?.isVerified, emailSentmessage: "You Singup Successfully" })

    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}

const verifyUser = async (req, res) => {
    console.log('req.body verify User', req.body)

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
            const token = generateToken(user._id)
            res.status(200).json({
                success: true,
                message: "Email Verified",
                user: {
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let userData = await User.findOne({ email })
        if (!userData) return res.status(400).json({ errors: 'Email not exist' });
        if (!userData?.isVerified) return res.status(400).json({ errors: 'Email Not verified' })
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) return res.status(400).json({ errors: 'Incorrect password' });
        const data = {
            user: {
                id: userData._id
            }
        }
        const authToken = jsonWebToken.sign(data, jwtSecrete)
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
const addHisab = async (req, res) => {
    // console.log('Req.body', req.body)
    const { id } = req?.params
    try {
        let hisab = {
            partyName: req.body.partyName,
            date: req.body.date,
            pricePerMetre: req.body.pricePerMetre,
            totalMetre: req.body.totalMetre,
            totalPrice: req.body.totalPrice,
            id: req.body.type == 'SELL' ? req.body.itemId : new mongoose.mongo.ObjectId(),
            paymentRcvd: [{ paymentRcvd: 0, remainingPayment: 0 }],
            remainingBal: req.body.totalPrice,
            type: req.body.type,
            unitType: req.body.unitType ? req.body.unitType : 'Kg',
            quality: req.body.quality,
            inwardDate: req.body.inwardDate
        }
        let isPartyExist = false
        let result = await Party.findOne({ partyName: req.body.partyName, userId: id })

        // console.log(result, 'result')
        if (!result) {
            const partyData = await Party.create({
                userId: id,
                id: new mongoose.mongo.ObjectId(),
                partyName: req.body.partyName,
                hisabKitab: hisab
            })
            const user = await User.findById(
                { _id: req.params.id },
            );
            // console.log(user, 'user')
            user?.partyId.push(partyData?._id)
            user.save()

        }
        else {
            const partyData = await Party.findById(result._id)
            // console.log(partyData,'partyData')
            partyData?.hisabKitab.push(hisab)
            partyData.save()
        }
        res.send({ success: true ,message:`You ${req.body.type} product added successfully`})
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}
const upDateHisab = async (req, res) => {
    const { recordId, paymentRcvd, hisabId, userId } = req?.body
    console.log(req.body)
    try {
        let result1 = await Party.findById(recordId)
        console.log('result1', result1)
        let index = result1?.hisabKitab.findIndex((x) => x.id == hisabId)
        console.log('index', index)
        console.log(' ...result1?.hisabKitab[index].paymentRcvd', result1?.hisabKitab[index])
        console.log('result1?.hisabKitab', result1?.hisabKitab)

        let filterArray = result1?.hisabKitab.filter((x) => x.id != result1?.hisabKitab[index].id)
        result1?.hisabKitab[index].paymentRcvd.push({ paymentRcvd: paymentRcvd > result1?.hisabKitab[index].remainingBal ? result1?.hisabKitab[index].remainingBal : paymentRcvd, remainingPayment: paymentRcvd > result1?.hisabKitab[index].remainingBal ? 0 : result1?.hisabKitab[index].remainingBal - paymentRcvd, date: new Date() })
        console.log('result1?.hisabKitab[index].paymentRcvd', result1?.hisabKitab[index].paymentRcvd)
        console.log('result1?.hisabKitab[index].paymentRcvd.paymentRcvd', result1?.hisabKitab[index].paymentRcvd.paymentRcvd)
        console.log(result1?.hisabKitab[index].remainingBal)


        let obj = {
            partyName: result1?.hisabKitab[index].partyName,
            date: result1?.hisabKitab[index].date,
            pricePerMetre: result1?.hisabKitab[index].pricePerMetre,
            totalMetre: result1?.hisabKitab[index].totalMetre,
            totalPrice: result1?.hisabKitab[index].totalPrice,
            id: result1?.hisabKitab[index].id,
            type: result1?.hisabKitab[index].type,
            quality: result1?.hisabKitab[index].quality,
            unitType: req.body.unitType ? req.body.unitType : 'Kg',
            inwardDate: req.body.inwardDate,
            paymentRcvd: result1?.hisabKitab[index].paymentRcvd,
            remainingBal:
                result1?.hisabKitab[index].remainingBal > 0 ?
                    result1?.hisabKitab[index].paymentRcvd[result1?.hisabKitab[index].paymentRcvd.length - 1].remainingPayment
                    :
                    result1?.hisabKitab[index].totalPrice - result1?.hisabKitab[index].paymentRcvd

        }
        console.log('filterArray before', filterArray)

        filterArray.push(obj)
        console.log('filterArray', filterArray)

        let result = await Party.updateOne(
            {
                $and: [
                    { _id: recordId },
                    // {"hisabKitab.id": hisabId},
                ]
            },
            {
                $set: { "hisabKitab": filterArray },
            }
        );
        console.log('rrrrrrr', result)
        res.send({ success: true })
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}

// const upDateInwardOutward = async (req, res) => {
//     const { mainId, recId } = req?.body
//     const date = new Date()
//     console.log(req.body)
//     try {

//         const partyData = await Party.findById(mainId)
//         console.log('rrrrrrr', partyData)
//         let selectedRec = partyData.hisabKitab.find((rec) => rec.id == recId)
//         console.log( selectedRec['type'] ,'selectedRec')
//         selectedRec.type = "SELL"
//         selectedRec.paymentIsCleared = true
//         selectedRec.outwardDate = date.toISOString().split('T')[0] 
//         partyData.markModified('hisabKitab');
//         await partyData.save()

//         console.log('selectedRec', selectedRec)
//         res.send({ success: true })
//     }
//     catch (err) {
//         console.log('Err', err)
//         res.send({ success: false })
//     }
// }
const removeOutward = async (req, res) => {
    const { mainId, recId } = req?.body
    const date = new Date()
    console.log(req.body)
    try {

        let partyData = await Party.findById(mainId)
        console.log('rrrrrrr', partyData)
        partyData.hisabKitab = partyData.hisabKitab.filter((rec) => rec.id != recId)
        console.log(partyData, 'filteredData')
        await partyData.save()

        res.send({ success: true })
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}

const updateQuantity = async (req, res) => {
    const { mainId, itemId, totalMetre } = req?.body
    console.log(req.body ,'updateQuantity Body')
    try {
        let partyData = await Party.findById(mainId)
        let result1 = partyData.hisabKitab.find((item, index) => item.id == itemId)
        // console.log('rrrrrrr', result1)
        console.log('result1.totalMetre', result1.totalMetre)
        console.log('totalMetre', totalMetre)

        result1.totalMetre = result1.totalMetre - totalMetre
        console.log('rrrrrrr', result1)
        partyData.markModified('hisabKitab');
        partyData.save()

        res.send({ success: true })
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}
module.exports = { createUser, loginUser, updateUserRole, deleteUser, verifyUser, addHisab, upDateHisab, removeOutward, updateQuantity };
// module.exports=router