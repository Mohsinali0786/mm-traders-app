const express =require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const {getUser, getCurrenciesValue } = require('../controllers/get');

router.get('/getUser', getUser)
router.get('/getCurrencies', getCurrenciesValue)
router.get('/getUserbyId', getCurrenciesValue)


module.exports=router