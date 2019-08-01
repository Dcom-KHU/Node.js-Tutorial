const fs=require('fs');
const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    fs.readFile('./index.html',(err,data)=>{
        if (err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/test',(req,res)=>{
    console.log('GET /test');
    res.send('GET');
});

app.post('/test',(req,res)=>{
    console.log('POST /test');
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});