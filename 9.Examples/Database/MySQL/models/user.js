const pool=require('../pool');


const getUserByUserId=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const connection=await pool.getConnection(async conn=>conn);
            try{
                const [rows]=await connection.query(`SELECT * FROM users WHERE userId=?;`,[userId]);
                connection.release();
                resolve(rows);
            }
            catch(err){
                connection.release();
                reject(err);
            }
        }
        catch(err){
            connection.release();
            reject(err);
        }
    });
}

const insertUser=(userId,hashedPassword,email,name,salt)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const connection=await pool.getConnection(async conn=>conn);
            try{
                const [rows]=await connection.query(`INSERT INTO users(userId,hashedPassword,email,name,salt) VALUES(?,?,?,?,?);`,[userId,hashedPassword,email,name,salt]);
                connection.release();
                resolve(rows);
            }
            catch(err){
                connection.release();
                reject(err);
            }
        }
        catch(err){
            connection.release();
            reject(err);
        }
    });
}

module.exports={
    getUserByUserId:getUserByUserId,
    insertUser:insertUser,
}