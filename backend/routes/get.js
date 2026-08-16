const express =require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const {getUser, getCurrenciesValue, getHisab, getInwards, getAllParties,getAllProductCategories} = require('../controllers/get');

router.get('/getUser', getUser)
router.get('/getCurrencies', getCurrenciesValue)
router.get('/gethisab/:id', getHisab)
router.get('/getInwardEntry/:id', getInwards)
router.get('/getAllParties/:userId', getAllParties)
router.get('/getAllProductCategories', getAllProductCategories)




module.exports=router