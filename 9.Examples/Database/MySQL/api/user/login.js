const CryptoJS=require('crypto-js');
const User=require('../../models/user');

const Login=(req,res)=>{
    const userId=req.body.userId;
    const password=req.body.password;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!userId || !password){
                reject({message:'Request Body Error!'});
            }
            else{
                resolve();
            }
        });
    }

    const UserCheck=()=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const user=await User.getUserByUserId(userId);
                if(user.length===0){
                    reject({message:'userId Error!'});
                }
                else{
                    resolve(user[0]);
                }
            }
            catch(e){
                reject(e);
            }
            
        });
    }

    const PasswordCheck=(user)=>{
        return new Promise(async(resolve,reject)=>{
            const salt=user.salt;
            const hashedPassword=CryptoJS.PBKDF2(password,salt,{keySize:16,iterations:Number(process.env.REPEAT_NUM)}).toString();
            if(hashedPassword!==user.hashedPassword){
                reject({message:'Password Error!'});
            }
            else{
                resolve(user);
            }
        });
    }

    const SetSession=(user)=>{
        return new Promise((resolve,reject)=>{
            req.session.user={userId:user.userId,name:user.name};
            req.session.save(()=>{
                resolve();
            });
        });
    }

    DataCheck()
        .then(UserCheck)
        .then(PasswordCheck)
        .then(SetSession)
        .then(()=>{
            res.status(200).json({message:'Success'});
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).json(err);
        });
}

module.exports=Login;