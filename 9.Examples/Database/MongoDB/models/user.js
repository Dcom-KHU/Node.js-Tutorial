const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    userId: {type: String},
    name: {type: String},
    email: {type: String},
    hashedPassword: {type: String},
    salt: {type: String}
},{
    collection:'User'
});

const User=mongoose.model('User',UserSchema);

module.exports=User;