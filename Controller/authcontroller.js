const path =require('path')
const bcryptjs=require('bcryptjs')
const AuthModel=require('../Model/authmodel')
const {validationResult}=require('express-validator')
const nodemailer=require('nodemailer')
const sendGridMailer=require('nodemailer-sendgrid-transport')
const createTranspoter=nodemailer.createTransport(sendGridMailer({
    auth:{
        api_key:'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'

    }
}))

exports.getpageview=(req,res)=>{
    res.render('Auth/reg',{
        title:"registration page",
        path:'/reg',
        error:[]
    })
}
exports.postregistrationpage=(req,res)=>{
    console.log("body value",req.body);
    const firstname=req.body.f_name
    const lastname=req.body.l_name
    const email=req.body.email
    const password=req.body.password
console.log("from value",firstname,lastname,email,password);
let error =validationResult(req)
if(!error.isEmpty()){
    errorResponce=validationResult(req).array()
    console.log("dfdfdfd",errorResponce);
    res.render('Auth/reg',{
        title:'registation page',
        path:'/reg',
         errMsg:'',
        error:errorResponce

    })

}
else{
AuthModel.findOne({EmailId:email}).then((result)=>{
    if(result){
        console.log("Email Already Exist");
        res.redirect('/login')
    }else{
        bcryptjs.hash(password,12).then((hashpassword)=>{
            const registartion=new AuthModel({
                FirstName:firstname,
                LastName:lastname,
                EmailId:email,
                Password:hashpassword
            })
            registartion.save().then((result)=>{
                console.log("registration completed successfully message",result);
                createTranspoter.sendMail({
                    to:email,
                    from:'sirshendukundu1994@gmail.com',
                    subject:'registration successful',
                    html:'<h1>Hello '+firstname+' , You have Successfully register</h1>'
                })
                res.redirect('/login')
            }).catch((err)=>{
                console.log("registration not succesfully ",err);
            })

        }).catch((err)=>{
            console.log(err);
        })
    }

}).catch((err)=>{
    console.log(err);
})
}  
}
exports.getloginpage=(req,res)=>{
    let message=req.flash('error');
    console.log('message');
    if(message.length>0){
        message=message[0];
    }else{
        message=null
    }
    res.render('Auth/login',{
        title:"login page",
        path:'/login',
        errMsg:message,
        cookie_data:req.cookies
    })
}
exports.postloginpage=(req,res)=>{
    console.log("body login value",req.body);
    const loginemail=req.body.emailid
    const loginpassword=req.body.password
    const checkbox =req.body.checkbox

    AuthModel.findOne({EmailId:loginemail}).then((userValue)=>{
        console.log(userValue);
        if(!userValue){
            console.log("Invalied Emailid");
            req.flash('error','Error:Invalied Emailid')
            res.redirect('/login')
        }else{
           return   bcryptjs.compare(loginpassword,userValue.Password).then((result)=>{
                console.log("Invalied Password");
                req.flash('error','Error:Invalied Password')
                if(result){
                    console.log("Logged normal In ",result);
                    req.session.isLoggedIn=true
                    req.session.user=userValue
             return  req.session.save(result=>{
                 if(result){
                    console.log(result);
                 }else{
                     if(checkbox){
                         const cookiedata={
                             emailcookie:userValue.EmailId,
                             Password:loginpassword
                         }
                         res.cookie('cookiedata',cookiedata,
                         {
                             expires:new Date(Date.now()+12000000),
                             httpOnly:true
                         }
                         )
                     }
                 }
                 console.log("Logged in",result);

                     res.redirect('/shop')

                    })
                   
                }
                res.redirect('/login')
            }).catch((err)=>{
                console.log(err);
            })
        }
    }).catch((err)=>{
        console.log(err);
    })
}
exports.getlogout=(req,res)=>{
    req.session.destroy()
    console.log("session Expired");
    res.redirect('/login')
}
