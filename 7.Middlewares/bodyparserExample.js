const express=require('express');
const app=express();

app.use(express.static(__dirname+'/static'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/send',(req,res)=>{
    const text=req.body.text;
    console.log('Received text:'+text);
    res.send(text);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});