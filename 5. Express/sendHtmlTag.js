const express=require('express');
const app=express();

app.get('/bold',(req,res)=>{
    res.send('<b>bold</b>');
});

app.get('/italic',(req,res)=>{
    res.send('<i>italic</i>');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});