const express =require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const {getUser } = require('../controllers/get')

router.get('/getUser', getUser)
module.exports=router