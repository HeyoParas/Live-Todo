const {getUser} = require("../controllers/token");
const userModel = require("../models/userSchema");
const verifyUser =async (req,res,next)=>{
    const userlogin = await getUser(req.cookies.mycookie);
    // const userExists = await userModel.findById({_id:userlogin.id})
    if(userlogin)
        next();
    else
        res.send({message:"Please Login first!!",loginStatus:false});
}
const checkLoginStatus = async (req,res)=>{
    const userlogin =  await getUser(req.cookies.mycookie);
    // const userExists = await userModel.findById({_id:userlogin.id})
    console.log(userlogin) ;
    if(userlogin){
        console.log("true");
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