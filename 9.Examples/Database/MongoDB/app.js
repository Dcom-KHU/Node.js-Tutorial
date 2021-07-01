const express=require('express');
const session=require('express-session');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const MongoStore=require('connect-mongo');
const path=require('path');
require('dotenv').config();
const app=express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    maxAge:7*24*60*60*1000,
    store:MongoStore.create({
        mongoUrl:process.env.DB_URL,
        collection:"sessions"
    })
}));
app.use('/js',express.static(path.join('static','js')));
app.use('/css',express.static(path.join('static','js')));

app.use('/api',require('./api'));
app.use('/',require('./routes'));

mongoose
    .connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((e)=>{
        console.error(e);
    });

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});