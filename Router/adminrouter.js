const express=require('express');
const adminRouter=express.Router();
const adminController=require('../Controller/admincontroller');
const isAuth=require('../middle_ware/isAuth')

adminRouter.get('/addproduct',isAuth,adminController.getaddproduct)
adminRouter.post('/addpostvalue',adminController.postaddproduct)
adminRouter.get('/allproduct',isAuth,adminController.getallproduct)
adminRouter.get('/edititem/:Eid',adminController.geteditproduct)
adminRouter.post('/editpostvalue',adminController.posteditproduct)
adminRouter.get('/deleteitem/:Did',adminController.getdeleteproduct)
adminRouter.get('/Admin/DetailsProduct/asc',adminController.getascending)
adminRouter.get('/Admin/DetailsProduct/dsc',adminController.getdescending)




module.exports=adminRouter;