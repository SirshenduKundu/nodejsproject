const express =require('express');
const appServer=express();
const path=require('path');
const cookieParser=require('cookie-parser')
const flash=require('connect-flash')
const csurf=require('csurf')//csrf import--1
const UserModel=require('./Model/authmodel')

const adminRouting=require('./Router/adminrouter');
const shopRouting=require('./Router/shoprouter')
const authrouting=require('./Router/authrouter')
const errorrouting=require('./Router/errorrouter')
const Exsession= require('express-session')
const mongodbsession=require('connect-mongodb-session')(Exsession)
const mongoose=require('mongoose');
const DbDriver='mongodb+srv://data_kundu:sirshendu123@cluster0.13xzb.mongodb.net/SirshenduNodeJsProject?retryWrites=true&w=majority'
const multer=require('multer');
appServer.use(express.urlencoded());
appServer.use(express.static(path.join(__dirname,'Public')))
appServer.set('view engine','ejs')
appServer.set('views','View')
appServer.use(flash())
const csurfProtection=csurf()//csrf===2
appServer.use('/uploadimage',express.static(path.join(__dirname,'uploadimage')));
const fileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploadimage')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
const fileFilter=(req,file,callback)=>{
    if(file.mimetype.includes("png")||file.mimetype.includes("jpg")||file.mimetype.includes("jpeg"))
    {
        callback(null,true)
    }else{
        callback(null,false)
    }
}
appServer.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('productimage'))
const StoreValue=new mongodbsession({
    uri:"mongodb+srv://data_kundu:sirshendu123@cluster0.13xzb.mongodb.net/SirshenduNodeJsProject",
    collection:"my-new-session"
})
appServer.use(Exsession({
    secret:"secret-key",
    resave:false,
    saveUninitialized:false,
    store:StoreValue
}))
appServer.use((req,res,next)=>{
    if(!req.session.user){
        return next()
    }
UserModel.findById(req.session.user._id).then((result)=>{
req.user=result
console.log("app"+req.user);
next()
}).catch((err)=>{
    console.log(err);
})
})
appServer.use(cookieParser())
appServer.use(csurfProtection)//-----3
appServer.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedIn
    res.locals.csrfToken=req.csrfToken()//----3

    next()
})



appServer.use(adminRouting);
appServer.use(shopRouting);
appServer.use(authrouting)
appServer.use(errorrouting)

mongoose.connect(DbDriver,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{
    console.log(result);
appServer.listen(1234,()=>{
    console.log("server is connected and port 1234");
})
}).catch((err)=>{
    console.log(err);
})