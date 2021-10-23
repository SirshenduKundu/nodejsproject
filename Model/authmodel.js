const mongoose=require('mongoose')
const SchemaVariable=mongoose.Schema
const Authmodel=new SchemaVariable({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    EmailId:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("registrations",Authmodel)