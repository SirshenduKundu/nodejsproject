exports.getpagenotfound=(req,res)=>{
    res.render('pagenotfound/pagenotfound',{
        title:'page not found',
        path:""
    })
}