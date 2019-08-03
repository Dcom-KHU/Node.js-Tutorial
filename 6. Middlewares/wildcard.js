const express=require('express');
const app=express();

app.get('/id/:number',(req,res)=>{
    const num=req.params.number;
    res.send(num);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});