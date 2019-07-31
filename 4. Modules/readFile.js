const fs=require('fs');

fs.readFile('dream.txt',(err,data)=>{
    if (err)
        throw err;
    console.log(data.toString());
});