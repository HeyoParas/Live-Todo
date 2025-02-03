<<<<<<< HEAD
const {getUser} = require("../controllers/token");
const verifyUser =(req,res,next)=>{
    const userlogin = getUser(req.cookies.mycookie);
    if(userlogin)
        next();
    else
        res.send({message:"Please Login first!!",loginStatus:false});
}
const checkLoginStatus = async (req,res)=>{
    const userlogin = getUser(req.cookies.mycookie);
    if(userlogin){
        res.json({success:true})
    }
    else{
        res.json({success:false})
    }
}
module.exports={
    verifyUser,checkLoginStatus
=======
const {getUser} = require("../controllers/token");
const verifyUser =(req,res,next)=>{
    const userlogin = getUser(req.cookies.mycookie);
    if(userlogin)
        next();
    else
        res.send({message:"Please Login first!!",loginStatus:false});
}
const checkLoginStatus = async (req,res)=>{
    const userlogin = getUser(req.cookies.mycookie);
    if(userlogin){
        res.json({success:true})
    }
    else{
        res.json({success:false})
    }
}
module.exports={
    verifyUser,checkLoginStatus
>>>>>>> 905a393c54e3e76e6e3e8bc3db8c2645aa1ad8a7
}