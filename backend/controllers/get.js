const express =require('express')
const User=require('../models/userSchema')
const http = require('http');
const axios = require('axios')
const apiKey = 'cur_live_0IZx3JH7uo2F6C5PesFXYTEfqnxc2hy0xW9RbwyL'

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

const getCurrenciesValue = async (req,res)=>{

    return axios
    .get(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=USD`)
    .then((response) => res.send(response.data)).catch((err)=>{
        console.log(Err,'Err')
    });
    // let data = '';

    // const options = {
    //     hostname: `http://api.currencyapi.com/v3/latest?apikey=${apiKey}`,
    //     // path: '/getCurrencies',
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   };
    //   const request = http.get(options?.hostname, (response) => {
    //     response.setEncoding('utf8');
    //     response.on('data', (chunk) => {
    //       console.log(chunk ,'chunk');
    //       data += chunk;
    //     });
    
    //     response.on('end', () => {
    //       console.log(data ,'data');
    //     });
    //   });
    
    //   request.on('error', (error) => {
    //     console.error(error);
    //   });
    
    //   request.end();
}

module.exports = { getUser , getCurrenciesValue };
// module.exports=router