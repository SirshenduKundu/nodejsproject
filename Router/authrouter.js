const express=require('express')
const authrouter=express.Router()
const authcontroller=require('../Controller/authcontroller')
const {check,body}=require('express-validator')


authrouter.get('/reg',authcontroller.getpageview)
authrouter.post('/postregistration',
[
body('f_name','Enter your valid first name').isLength({min:5}),
body('l_name','Enter your valid last name' ).isLength({min:2}),
check('email').isEmail().withMessage('Enter your valid Email'),
body('password','Enter your valid password').isLength({min:5,max:12})
],

authcontroller.postregistrationpage)
authrouter.get('/login',authcontroller.getloginpage)
authrouter.post('/postlogin',authcontroller.postloginpage)
authrouter.get('/logout',authcontroller.getlogout)








module.exports=authrouter