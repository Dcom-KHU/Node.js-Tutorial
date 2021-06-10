const express=require('express');
const app=express();

app.use(express.static(__dirname+'/static'));

app.get('/send',(req,res)=>{
    const text=req.query.text;
    console.log("Received text:"+text);
    res.send('text='+text);
});

app.listen(3000,()=>{
    console.log('Server in running on port 3000!');
});