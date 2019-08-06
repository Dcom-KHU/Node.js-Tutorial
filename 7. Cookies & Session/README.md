## 7. Cookies & Session
���� ������ �����Դϴ�.  
�̹� ���Ǵ� ��Ű�� ���ǿ� ���� �ٷﺸ���� �ϰڽ��ϴ�.  

��Ű�� ������ �������� �˾ƺ��� ���� ��Ű�� ������ �ʿ��ϰ� �� ��濡 ���ؼ� �˾ƺ������ϰڽ��ϴ�.  
HTTP ����� �ΰ����� Ư���� ���մϴ�.  
- �񿬰� (Connectionless)
- ������ (Stateless)

Connectionless�� Ŭ���̾�Ʈ(=������)�� �������� request�� ������, ������ Ŭ���̾�Ʈ���� response�� ������ �� �̻��� ������ ���� �ʴ´ٴ� ���Դϴ�.  
�̸� Ȯ���� �� �ִ� �κ���, �츮�� �� ����Ʈ�� �����Ͽ� ������ �������� �޾����� �ٸ� ����Ʈ�� �̵����� �ʴ� �̻� ���ͳݰ� ������ �����ص� ����Ʈ ȭ���� �״�� �����˴ϴ�.  
���� ������ ��� ����ϰ� �ִ� ���¿��ٸ� ���ͳ��� ���� ��� �̹� �ҷ��� �������� �� �� ���� �˴ϴ�.  

Stateless�� ���������� �������� �ʾ� ���� request�� ������ request�� ���������� ó���Ѵٴ� �ǹ��Դϴ�.  
Connectionless�� ���� request�� response�� �ְ� �޾� ����� �������ٸ� ���� ���� ������ �������� �ʽ��ϴ�.  

������ �츮�� �����񽺸� �̿��ϸ鼭 ����ϴ� �ڵ� �α���, ���θ��� �ֱ� �� ��ǰ ���, ���� ���̻� �˾��� ���� ���� ���� �츮�� �ڵ� �α��ο� üũ�� �� �Ͱ�, � ��ǰ�� ���Ҵ���, �˾� �Ⱥ��ڴٰ� üũ�� �ͱ��� ������(Ŭ���̾�Ʈ Ȥ�� ����)�� ����� �߱⿡ �����Ǵ� ����Դϴ�.  

HTTP ���������� �̷� ����� ���մϴ�.  
�׷��ٸ� ���� ����ϴ� �ɱ��?  
�ٷ� ��Ű�� �����Դϴ�.  

��Ű�� ������ �ݺؾ��� ������ ���� HTTP ���������� ������ �����ϱ� ���� �����߽��ϴ�.  

��Ű�� ������ ������ ����ϳ� �������� ���� ����ϴ����� ���� �޷��ֽ��ϴ�.  

��Ű�� Ŭ���̾�Ʈ�� ������ ����ϸ� Ŭ���̾�Ʈ�� ����ϴ� ���̰�, ������ ������ ����ϸ� ������ ����ϴ� ���Դϴ�.  

### (1) Cookies
�ϴ� ��Ű�� ������ ���� ã�� ���ڽ��ϴ�.  
���� ���ǿ� �����ϰ� ���̹��� �����ؼ� F12�� ���������� �ϰڽ��ϴ�.  

5�� Express������ network ���� �鿩�� �������� �̹����� Application ���� �������ô�.  
�׷��� ������ ������ ������ ���� Storage�� Cookies�� ã�� �� �ֽ��ϴ�.  

�� ������ https://www.naver.com �� ���� ������ ���� â�� ��µ˴ϴ�.  

<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/6.PNG?raw=true">

�� ȭ�鿡�� �� �� �ִ� ���� 7���� ��Ű�� �����ϸ�, ������ ���� ������, ���, ������ ���� ��Ÿ���ֽ��ϴ�.  
�̷��� ��Ű���� Ŭ���̾�Ʈ���� ������ request�� ���� �� �ڵ����� ������ �˴ϴ�.  
��Ű���� ��� ���ԵǾ��� Ȯ���� ���÷��� ������ ������ network �ǿ��� Ŭ���̾�Ʈ�� ������ request�� ���� ��   
request headers�� Ȯ���ϸ� cookie: �ϰ� ���Ե� ��Ű���� name=value; �� �ݺ��� ���·� ���� �˴ϴ�.  

�̷��� ��Ű���� ��� ��������� �ɱ��?  
response headers�� set-cookie�� ���� name=value;�������� �Է��� �شٸ� Ŭ���̾�Ʈ�� ��Ű�� �����˴ϴ�.  
�Ǵ� Ŭ���̾�Ʈ���� �ڹٽ�ũ��Ʈ�� �̿��� ������ ���� ��Ű�� �����Ҽ��� �ֽ��ϴ�.  
```javascript
document.cookie="name=value";
```

�̹��� cookie-parser �̵��� �̿��ؼ� ��Ű�� �����ϰ� ȣ���ϴ� ������ �����ϵ��� �ϰڽ��ϴ�.  

cookie-parser ����� ��ġ�� ���ô�.  
```bash
npm install cookie-parser --save
```
```javascript
//cookieParser.js
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const fs=require('fs');
const express=require('express');

const app=express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    fs.readFile('./static/html/index.html',(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/get',(req,res)=>{
    res.send(req.cookies);
});

app.post('/set',(req,res)=>{
    const value=req.body.value;
    res.cookie('fruit',value,{maxAge:2*60*1000}); // expires after 2 min.
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```
app.use(cookieParser());�� ���� cookie-parser �̵��� ����� �ݴϴ�.  
cookie-parser�� ����ϸ� req.cookies�� cookie ���� �޾ƿ� �� �ֽ��ϴ�.  
/get���� GET ��û�� ������ ���� �������� ����� ��Ű���� ����� �ݴϴ�.  
/set���� POST ��û�� ������ fruit�̶�� �̸��� ��Ű�� value�� ������ �ݴϴ�.  

cookieParser.js�� �����ϰ� localhost:3000�� ������ ���ô�.  
fruit�� ���� value�� �Է��ϰ� sumbit ��ư�� �������ô�.  
�� ������ localhost:3000/get�� �����ϸ� ��� �Է��� fruit�� ���� �ݿ��� ��Ű���� ��ȸ�� �� �ֽ��ϴ�.  
localhost:3000 ���� �ǵ��ư��� ���ο� ���� �Է��ϰ� localhost:3000/get�� �����ϸ� fruit�� ���� �ٲ���� �� �� �ֽ��ϴ�.  

### (2) Session
��Ű�� �� �������� �����͸� �����ϴ� ����̾����ϴ�.  
�׷���, �α��� ���¸� ������ ���� ��Ű�� ����ϸ� ��� �ɱ��?  
��Ű�� ���̵�� ��й�ȣ�� �����Ѵٸ� �츮�� ������ ������ ���Ͽ� ���ҵ��� ������ ���� �ְ�, ���� ������ �����ϰ� �� ���Դϴ�.  
���Ȼ� �ſ� ����� �� ������.  
�׷��� �α��� ���¿� ���� ���Ȼ� �߿��� ������ �� �������� �ƴ� �� ������ ���� �˴ϴ�.  
�̸� �����̶�� �մϴ�.  


������ �̿��ϱ� ���ؼ��� express-session�̶�� ����� ����ؾ��մϴ�.  
�켱 ��ġ�� ���ô�.  
```bash
npm install express-session --save
```

```javascript
//sessionExapmle.js
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
        if(err) throw err;
        res.redirect('/');
    });
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```
const session=require('express-session');���� express-session ����� �ҷ��Խ��ϴ�.  
app.use(session({...}));���� �̵��� ����߽��ϴ�.  
�� ���� option���� ������ �������ڸ�  
- secret : ��Ű�� ���Ƿ� �����ϴ� ���� �����ϱ� ����, ���� ��ȣȭ�� ���Ǵ� ��.
- resave : ������ ������ �������� ����.
- saveUninitialized : ������ ����Ǳ� ���� uninitialized ���·� ������ ��.  

(express-session options, https://www.npmjs.com/package/express-session#options)

���� req.session.(name)���� ���ǿ� ������ �� �ֽ��ϴ�.  

'/get'���� GET ��û�� ������ �켱 session�� fruit�� �ִ��� Ȯ���մϴ�.  
fruit ���ǵǾ� ������ fruit�� ���� req.session.fruit�� ����� �ݴϴ�.  
���� fruit�� ���ǵ��� �ʾ����� 'No session!'�� ����� �ݴϴ�.  

'/set'���� POST ��û�� ������ req.session.fruit�� ���� �����ϰų� ������ �ݴϴ�.  

'/delete'�� GET ��û�� ������ ������ �����ϴ� req.session.destory�� �����ϰ�, callback �Լ��� �����մϴ�.  

localhost:3000�� �����Ͽ� fruit�� ���� �Է��Ͽ� submit ��ư�� ���� �ݴϴ�.  
localhost:3000/get�� �����ϸ� ��� �Էµ� ���� Ȯ���� �� �ֽ��ϴ�.  
������ ��Ű������ ������ ����� ����� �մϴ�.  
�������� �ѹ� ���캸�ڽ��ϴ�.  
�����ڵ���(F12) - Application - Stroage - Cookie�� Ȯ���� ���ô�.  

���ٸ� ������ ���� �ʾ����� connect.sid��� ��Ű�� ������ ���� �� �� �ֽ��ϴ�.  
�� ������ ������ �����ϰ� �� ������ �ĺ����� session id(=sid)�� ��ȣȭ�Ͽ� ���������� ������ �ݴϴ�.  
������ �� �������� ���� ���̵�� ������ �ĺ��� �� �ֽ��ϴ�.  

localhost:3000/delete�� �����ϸ� ������ �����ǰ�, localhost:3000/get�� �����ϸ� No session�̶�� ����� �Ǵ°��� Ȯ���� �� �ֽ��ϴ�.  

### (3) Assignment
6�� Middlewares�� ���� app.js�� ���� �߰������ ������ ���ô�.  
1. signup.html�� �а�, �̸� �� 4���� ȸ������ �߰�. login.html�� ������ ����.
1. app.js�� users array�� 1.���� �߰��� ȸ�������� �°� ����, ȸ�� ���Խ� �߰��� ȸ�������� �Բ� ���. 
1. ������ �����ϰ� /login ���� POST ��û�� ������ �α��� ������, req.session.userId�� ȸ�� ���̵�(userId) ���� �� '/profile'�� redirect
1. '/profile'�� GET ��û�� ������ res.session.userId�� �������� users array���� ȸ���� ã�� ��, ��й�ȣ�� ������ ȸ�������� �����Ӱ� ���.  


�̷��� Node.js�� ���ǰ� ����Ǿ����ϴ�.  
���� ���п��� �ұ��ϰ� ������� ����� �ּż� �����մϴ�.  
�����ϼ̽��ϴ�!!