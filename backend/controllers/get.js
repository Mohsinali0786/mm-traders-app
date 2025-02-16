const express = require('express')
const User = require('../models/userSchema')
const Party = require('../models/partySchema')

const http = require('http');
const axios = require('axios')
const apiKey = 'cur_live_0IZx3JH7uo2F6C5PesFXYTEfqnxc2hy0xW9RbwyL'
const jsonwebtoken = require('jsonwebtoken');

const getUser = async (req, res) => {
    try {
        let data = await User.find({})
        console.log(data, 'data')
        let adminUser = 0;
        let user = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].role == 'admin') {
                adminUser++
            }
            else {
                user++
            }
        }
        // const user =(data.filter((x)=>x?.role == 'user')).length()

        res.send({ success: true, data: data, adminUser: adminUser, user: user })
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false, message: 'No record found' })
    }
}

const getCurrenciesValue = async (req, res) => {

    return axios
        .get(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=USD`)
        .then((response) => res.send(response.data)).catch((err) => {
            console.log(Err, 'Err')
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
const getHisab = async (req, res) => {
    try {
        let data = await Party.find({ userId: req.params.id })

        console.log('getData', data)
        res.send({ success: true, data: data })
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false, message: 'No record found' })
    }
}
const getInwards = async (req, res) => {
    // console.log('Req.body', req.body)
    const { id } = req?.params
    console.log(req.query.queryParams, 'req.query')
    try {

        let result = await Party.find({ userId: id })
        let filteredData = []
        if (result) {
            console.log(result, 'result')
            for (let i = 0; i < result.length; i++) {
                // console.log(result[i], 'result[i]')
                for (let j = 0; j < result[i].hisabKitab.length; j++) {
                    if(req.query.queryParams == "inWard"){
                        if (result[i].hisabKitab[j].type == "PURCHASER") {
                            filteredData.push(result[i].hisabKitab[j])
                        }
                    }
                    else{
                        if (result[i].hisabKitab[j].type == "SELLER") {
                            filteredData.push(result[i].hisabKitab[j])
                        }
                    }
                }
            }
        }
        else {

        }
        console.log(filteredData, 'filteredData')
        res.send({ success: true, result: filteredData })
    }
    catch (err) {
        console.log('Err', err)
        res.send({ success: false })
    }
}
module.exports = { getUser, getCurrenciesValue, getHisab, getInwards };
// module.exports=router