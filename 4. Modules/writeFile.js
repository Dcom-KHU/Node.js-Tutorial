const fs=require('fs');

const content='12�� 20�� ����';

fs.writeFile('dream.txt',content,(err)=>{
    if (err)
        throw err;
    console.log('���� ���!');
});