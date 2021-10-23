const mongoose =require('mongoose')
const SchemaVariable=mongoose.Schema
const ProductModelSchema=new SchemaVariable({
    ProductName:{
        type:String,
        require:true
    },
    ProductPrice:{
        type:String,
        required:true

    },
    ProductDescription:{
        type:String,
        required:true

    },
    ProductImage:{
        type:String,
        required:true

    }
})
module.exports=mongoose.model('Products',ProductModelSchema)