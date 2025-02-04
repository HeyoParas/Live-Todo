const {getUser} = require("../controllers/token");
const verifyUser =(req,res,next)=>{
    const userlogin = getUser(req.cookies.mycookie);
    if(userlogin)
        next();
    else
        res.send({message:"Please Login first!!",loginStatus:false});
}
const checkLoginStatus = async (req,res)=>{
    const userlogin =  await getUser(req.cookies.mycookie);
    console.log(userlogin) ;
    if(userlogin){
        res.json({success:true})
    }
    else{
        res.json({success:false})
    }
}
const isLogin=(req,res,next)=>{
    const userlogin = getUser(req.cookies.mycookie);
    if(!userlogin){
        next();
    }
}
module.exports={
    verifyUser,checkLoginStatus,isLogin
}