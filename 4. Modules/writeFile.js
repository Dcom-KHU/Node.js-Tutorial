const fs=require('fs');

const content='12월 20일 종강';

fs.writeFile('dream.txt',content,(err)=>{
    if (err)
        throw err;
    console.log('파일 썼다!');
});