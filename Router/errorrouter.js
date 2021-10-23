const express=require('express')
const errorrouting=express.Router()
const errorcontroller=require('../Controller/errorcontroller')


errorrouting.get('*',errorcontroller.getpagenotfound)



module.exports=errorrouting