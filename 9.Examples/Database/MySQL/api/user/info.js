const Info=(req,res)=>{
    if(!req.session.user){
        res.status(403).json({message:'Not Logined!'});
    }
    else{
        res.status(200).json({message:'success',data:req.session.user});
    }
}

module.exports=Info;