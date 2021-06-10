const express=require('express');
const app=express();
const bodyParser=require('body-parser')

app.use(express.static(__dirname+'/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.post('/send',(req,res)=>{
    const text=req.body.text;
    console.log('Received text:'+text);
    res.send(text);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});