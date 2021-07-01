const CryptoJS=require('crypto-js');
const User=require('../../models/user');

const Signup=(req,res)=>{
    const {userId, name, email, password}=req.body;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!userId || !name || !email){
                reject({message:'Request Body Error!'});
            }
            else{
                resolve();
            }
        });
    }

    const UserCheck=()=>{
        return new Promise(async(resolve,reject)=>{
            const user=await User.find({userId:userId});
            if(user.length!==0){
                reject({message:'Duplicated ID Error!'});
            }
            else{
                resolve();
            }
        });
    }
    
    const GeneratePassword=()=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const salt=CryptoJS.lib.WordArray.random(16).toString();
                const hashedPassword=CryptoJS.PBKDF2(password,salt,{keySize:16,iterations:Number(process.env.REPEAT_NUM)}).toString();
                const user=new User({
                    userId:userId,
                    name:name,
                    email:email,
                    hashedPassword:hashedPassword,
                    salt:salt
                });
                await user.save();
                resolve();
            }
            catch(err){
                reject(err);
            }
        });
    }

    DataCheck()
        .then(UserCheck)
        .then(GeneratePassword)
        .then(()=>{
            res.status(200).json({message:'Success'});
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).json(err);
        })
}

module.exports=Signup;