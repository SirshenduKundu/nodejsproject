const express=require('express');
const shopRouter=express.Router();
const shopController=require('../Controller/shopcontroller');
const isAuth=require('../middle_ware/isAuth')


shopRouter.get('/shop',shopController.getshopproduct)
shopRouter.post('/postsearch',shopController.postsearchproduct)
shopRouter.get('/viewdetails/:vid',isAuth,shopController.getviewdetails)
shopRouter.post('/postaddtocart',shopController.postaddtocart)
shopRouter.get('/cart',isAuth,shopController.getcartpage)
shopRouter.get('/deletecart/:did',shopController.getdeletecart)

//shopRouter.post('/postorder',shopController.postorderpage)
shopRouter.get('/order',shopController.getorderpage)

shopRouter.get('/shop/productshop/asc',shopController.getascending)
shopRouter.get('/shop/productshop/dsc',shopController.getdescending)



//shopRouter.get('*',shopController.getpagenotfound)
module.exports=shopRouter