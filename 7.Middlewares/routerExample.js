const express=require('express');
const app=express();

const router=require('./router');

app.use((req,res,next)=>{
    console.log(req.headers["user-agent"]);
    next();
});

app.use('/',router);

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});