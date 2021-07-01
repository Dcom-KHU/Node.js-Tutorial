const express=require('express');
const session=require('express-session');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const path=require('path');
const mysqlStore=require('express-mysql-session')(session);
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
    store:new mysqlStore({
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE
    })
}));
app.use('/js',express.static(path.join('static','js')));
app.use('/css',express.static(path.join('static','js')));

app.use('/api',require('./api'));
app.use('/',require('./routes'));

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});