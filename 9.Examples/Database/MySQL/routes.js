const fs=require('fs');
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.redirect('/main');
});

router.get('/main',(req,res)=>{
    fs.readFile('./views/main.html',(err,data)=>{
        if(err){
            console.error(err);
            res.status(500).json({message:'Failed to Load Web Page'});
        }
        else{
            res.header({'content-type':'text/html'});
            res.status(200).end(data.toString());
        }
    });
});

router.get('/login',(req,res)=>{
    fs.readFile('./views/login.html',(err,data)=>{
        if(err){
            console.error(err);
            res.status(500).json({message:'Failed to Load Web Page'});
        }
        else{
            res.header({'content-type':'text/html'});
            res.status(200).end(data.toString());
        }
    });
});

router.get('/signup',(req,res)=>{
    fs.readFile('./views/signup.html',(err,data)=>{
        if(err){
            console.error(err);
            res.status(500).json({message:'Failed to Load Web Page'});
        }
        else{
            res.header({'content-type':'text/html'});
            res.status(200).end(data.toString());
        }
    });
});

module.exports=router;