const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Index Page');
});

app.get('/first',(req,res)=>{
    res.send('First Page');
});

app.get('/second',(req,res)=>{
    res.send('Second Page');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});