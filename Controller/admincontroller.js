const path =require('path');
const ProductModel=require('../Model/productmodel')

exports.getaddproduct=(req,res)=>{
    res.render('Admin/AddProduct',{
        title:"add product page",
        path:'/addproduct'
    })
}
exports.postaddproduct=(req,res)=>{
    console.log("body value",req.body);
    const productName=req.body.productname
    const productPrice=req.body.productprice
    const productDescription=req.body.productdescription
    const productImage=req.file;
    console.log(productImage);
    const imagepath=productImage.path;

    console.log("form value",productName,productPrice,productDescription,imagepath);
const AddItem=new ProductModel({
    ProductName:productName,
    ProductPrice:productPrice,
    ProductDescription:productDescription,
    ProductImage:imagepath,
})
 AddItem.save().then((result)=>{
     console.log("Value Inserted",result);
 }).catch((err)=>{
     console.log("value not Inserted",err);
 })
 res.redirect('/allproduct')
}
exports.getallproduct=(req,res)=>{
    ProductModel.find().then((result)=>{
        console.log("getAllValue",result);
        res.render('Admin/DetailsProducts',{
        title:"all product page",
         AllValues:result,
         path:'/allproduct'
        })
    }).catch((err)=>{
        console.log(err);
    })
    
}
exports.geteditproduct=(req,res)=>{
    const productid=req.params.Eid
    ProductModel.findById(productid).then((result)=>{
console.log("value id",result);
res.render('Admin/EditAdmin',{
    title:"edit page",
    EditValue:result,
    path:'/edititem/:Eid'
})
    }).catch((err)=>{
        console.log(err);
    })
}
exports.posteditproduct=(req,res)=>{
console.log("edit body value",req.body);
const productId=req.body.productid
const updateproductname=req.body.productname
const updateproductprice=req.body.productprice
const updateproductdescription=req.body.productdescription
const updateproductimage=req.file
console.log(updateproductimage);
const productpath=updateproductimage.path
ProductModel.findById(productId).then((result)=>{
    console.log("value",result);
    result.ProductName=updateproductname
    result.ProductPrice=updateproductprice
    result.ProductDescription=updateproductdescription
    result.ProductImage=productpath
   result.save().then((result)=>{
       console.log("udated value",result);
       res.redirect('/allproduct')
   }).catch((err)=>{
       console.log(err);
   })
}).catch((err)=>{
    console.log(err);
})

}
exports.getdeleteproduct=(req,res)=>{
    const productid=req.params.Did
    ProductModel.deleteOne({_id:productid}).then((result)=>{
        console.log("delete",result);
        res.redirect('/allproduct')
    }).catch((err)=>{
        console.log(err);
    })
}
exports.getascending=(req,res)=>{
    ProductModel.find().sort({ProductName:1}).then((result)=>{
        console.log(result);
        res.render('Admin/DetailsProducts',{
            title:"ascending order",
            path:"",
            AllValues:result
        })
    }).catch((err)=>{
        console.log(err);
    })
}
exports.getdescending=(req,res)=>{
    ProductModel.find().sort({ProductName:-1}).then((result)=>{
        console.log(result);
        res.render('Admin/DetailsProducts',{
            title:"descending order",
            path:"",
            AllValues:result
        })
    }).catch((err)=>{
        console.log(err);
    })
}
