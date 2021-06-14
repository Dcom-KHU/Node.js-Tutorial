const fs=require('fs');
const express=require('express');
const app=express();

app.use((req,res,next)=>{
    console.log(req.headers["user-agent"]);
    next();
});

app.get('/',(req,res)=>{
    fs.readFile('./static/html/index.html',(err,data)=>{
        if(err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});