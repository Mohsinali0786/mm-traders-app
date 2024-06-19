const express =require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const {createUser , loginUser, updateUserRole} = require('../controllers/post')

router.post('/createUser',[[
    body('email').isEmail(),
    body('name').isLength({min:5}),
    body('password','incorrect Password').isLength({min:5})
]], createUser)

router.post('/loginUser',[[
    body('email','Enter correct email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
]], loginUser)
router.post('/updateRole/:id', updateUserRole)
module.exports=router