const express=require('express');
const fs=require('fs');
const app=express();
const session=require('express-session');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}));

app.get('/',(req,res)=>{
    fs.readFile('./static/html/index.html',(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/get',(req,res)=>{
    if(!req.session.fruit){
        res.send('No session!');
    }
    else{
        res.send(req.session.fruit);
    }
});

app.post('/set',(req,res)=>{
    const fruit=req.body.value;
    req.session.fruit=fruit;
    res.redirect('/');
});

app.get('/delete',(req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});