const path =require('path');
const productModel=require('../Model/productmodel');
const cartModel=require('../Model/cartmodel')


exports.getshopproduct=(req,res)=>{
    productModel.find().then((result)=>{
        console.log("shop value",result);
        res.render('Shop/productshop',{
            title:"shop page",
            shopValue:result,
            path:'/shop'
        })
    }).catch((err)=>{
        console.log(err);
    })
}
exports.postsearchproduct=(req,res)=>{
    console.log("fdfdfdf",req.body);
    const searchproduct=req.body.search
    
 productModel.find({$or:[{ProductName:{$regex:searchproduct}},{ProductDescription:{$regex:searchproduct}}]}).then((result)=>{
        console.log("search value",result);
        res.render('Shop/productshop',{
            title:"search page",
            shopValue:result,
            path:""
        })
    }).catch((err)=>{
        console.log(err);
    })
}
exports.getviewdetails=(req,res)=>{
const productid=req.params.vid
productModel.findById(productid).then((result)=>{
    console.log("id value",result);
res.render('Shop/viewdetails',{
    title:"view page",
    shopValue:result,
    path:"/viewdetails/:vid"
})
}).catch((err)=>{
    console.log(err);
})
}
exports.postaddtocart=(req,res)=>{  
    const cartArray=[]
    const c_id=req.body.pid;
     const user_id=req.user._id;
      const quantity=1
      cartModel.find({productId:c_id,userId:user_id}).then((formArray)=>{
          console.log("fetch detail id",formArray);
          if(formArray===''){
  
            productModel.findById(c_id).then((result)=>{
                cartArray.push(result)
             
              const Data=new cartModel({
                  productId:c_id,
                  quantity:quantity,
                  userId:user_id,
                  cart:cartArray
              })
              Data.save().then(result=>{
                  console.log("Successfullyyyyyyy added",result);
                  res.redirect('/cart')
                }).catch(err=>{
                  console.log("error",err);
                });
                  
               
          }).catch((err)=>{
              console.log(err);
          })
      } 
      else{
        //  productModel.findById(c_id).then((result)=>{
        //        cartArray.push(result)
           
        //     const Data=new cartModel({
        //         productId:c_id,
        //         quantity:quantity,
        //         userId:user_id,
        //         cart:cartArray
        //     })
        //     Data.save().then(result=>{
        //         console.log("Successfully added",result);
        //         res.redirect('/cart')
        //       }).catch(err=>{
        //         console.log("error",err);
        //       });
//=================================================
productModel.findById(c_id).then((result)=>{
    cartModel.findOne({productId:c_id,userId:user_id}).then((qty)=>{
        console.log(qty);
        if(qty){
            cartModel.findOneAndUpdate({productId:c_id,userId:user_id},{quantity:qty.quantity+1}).then((result)=>{
                
                  res.redirect('/cart')
            }).catch((err)=>{
              console.log(err);
          })
        }else{ 

            cartArray.push(result)
           
                 const Data=new cartModel({
                     productId:c_id,
                     quantity:quantity,
                     userId:user_id,
                    cart:cartArray
                })
                 Data.save().then(result=>{
                     console.log("Successfully added",result);
                    res.redirect('/cart')
                   }).catch(err=>{
                     console.log("error",err);
                  });




        }
    }).catch((err)=>{
        console.log(err);
    })
    
                
             
         }).catch((err)=>{
             console.log(err);
         })
  
      }
  }).catch((err)=>{
      console.log(err)
  })
}


exports.getcartpage=(req,res)=>{
    cartModel.find({userId:req.user._id}).then((result)=>{
    console.log("cart",result);
    res.render('Shop/cartpage',{
        title:'cart page',
        path:'/cart',
        cart_value:result
    })

    })
} 
  exports.getdeletecart=(req,res)=>{
      const deleteid=req.params.did
      cartModel.deleteOne({_id:deleteid}).then((result)=>{
          console.log("delete cart",result);
          res.redirect('/cart')

      }).catch((err)=>{
          console.log(err);
      })
  }
// exports.postorderpage=(req,res)=>{
// const orderid=req.body.oid
// console.log("order",orderid);
// cartModel.findById(orderid).then((result)=>{
//     console.log(result);
//     result.save().then((result)=>{
//         console.log(result);
//         res.redirect('/order')
//     }).catch((err)=>{
//         console.log(err);
//     })

// }).catch((err)=>{
//           console.log(err);
//       })
// }
// ------------------------------
exports.getorderpage=(req,res)=>{
    cartModel.find().then((result)=>{
        console.log(result);
        res.render('Shop/order',{
            title:"order page",
            cart_value:result,
            path:'/order'

        })

    }).catch((err)=>{
          console.log(err);
      })
}




exports.getascending=(req,res)=>{
    productModel.find().sort({ProductName:1}).then((result)=>{
        console.log("ascendind",result);
        res.render('Shop/productshop',{
            title:'view item ascending',
            shopValue:result,
            path:''
        })

    }).catch((err)=>{
        console.log(err);
    })
   
}
exports.getdescending=(req,res)=>{
    productModel.find().sort({ProductName:-1}).then((result)=>{
        console.log("descending",result);
        res.render('Shop/productshop',{
            title:'view item descending',
            shopValue:result,
            path:''

        })
    }).catch((err)=>{
        console.log(err);
    })
}
//page not found
// exports.getpagenotfound=(req,res)=>{
//     res.render('pagenotfound/pagenotfound',{
//         title:'page not found',
//         path:""
//     })
// }