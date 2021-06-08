const express=require('express');
const app=express();

const foo=require('./foo')

app.use((req,res,next)=>{
    console.log(req.headers["user-agent"]);
    next();
});

app.use('/foo',foo);

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});