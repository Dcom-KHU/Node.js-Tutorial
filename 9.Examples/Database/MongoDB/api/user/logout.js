const Logout=(req,res)=>{
    req.session.destroy(()=>{
        res.status(200).json({message:'success'});
    });
}

module.exports=Logout;