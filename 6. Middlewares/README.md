## 6. Middlewares
�̹� ���ǿ����� �̵��� ���� �˾ƺ����� �ϰڽ��ϴ�.  
���������� �����ϱ⿡ �ռ� �̵��� �������� ������ �����ϰ� �Ѿ�ڽ��ϴ�.  

�̵����� �ܾ���� ���� �����ϵ��� �߰��� ��ġ�� ����Ʈ�����Դϴ�.  
��� ���� �߰��̳ĸ�, ��û(request)�� ����(response)�� �߰��Դϴ�.  

�̹� ������ �������� ������ ���� �����ڷῡ ������ �ǰ�����,  
���� ������ ������� ���� �����̱� ������  
���ǿ� �Բ� ó������ �ۼ��� �����°��� ��õ�帳�ϴ�.  

### (1) Middleware basic
npm�� ���ؼ� �پ��� �̵��� ��ġ�Ͽ� �̿��Ҽ� �ֽ��ϴ�.  

������ �� ����, �̵��� ��� �۵��Ǵ� �� ���� ��ƺ����� �ϰڽ��ϴ�.  

``` javascript
//basic.js
const fs=require('fs');
const express=require('express');
const app=express();

app.use((req,res,next)=>{
    console.log(req.headers["user-agent"]);
    next();
});

app.get('/',(req,res)=>{
    fs.readFile('./static/html/index.html',(err,data)=>{
        if(err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

�ٸ� �κ��� ���� express ���ǿ��� �ٷ���� ������ �����ϰ�,  
�̹� �������� ó�� ������ app.use�� ���ؼ��� �����ϵ��� �ϰڽ��ϴ�.  

app.use�� ������ ������ �����ϴ�.  
app.use(�̵����)  

������ �̵����� �ܼ�â�� user-agent(=������ ����)�� ����Ͽ����ϴ�.  

�̵��� ����ϴµ� �����Ͻ� ���� app.use�� ��ġ�Դϴ�.  
app.use�� app.get Ȥ�� app.post���� ���� ��ġ�� �־�� �ϸ�,  
app.use ���̿��� ���� ������� ����Ǳ� ������ ������ �߿��մϴ�.  
����, ����� ���� �̵������ ��� callback�Լ��� �Ű������� req,res,next ������ �����ϸ�  
�̵������ ���������� next();�� �����ּž� ���� �̵���� Ȥ�� app.get / app.post�� ����ȴٴ� ���� ������ �ּ���.  

### (2) Router
����͸� ���� ������ ������� �������� ¤����� �ϰڽ��ϴ�.  
��� �츮�� �̹� ������� ����ϰ� �־����ϴ�.  
������� Ŭ���̾�Ʈ(=������)���� ��û�ϴ� �ּҿ� ���� �ٸ� ó���� �ϴ� ���� ���մϴ�.  
5�� Express���� app.get(), app.post() �Լ��� �ۼ��ϴ� �͵� ������� �� ������.  
Router �̵����� �̷��� ������� ���� ���ϰ� �����ݴϴ�.  
```javascript
//router.js
const fs=require('fs');
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    fs.readFile('./static/html/index.html',(err,data)=>{
        if(err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

module.exports=router;
```

```javascript
//routerExample.js
const express=require('express');
const app=express();

const router=require('./router')

app.use((req,res,next)=>{
    console.log(req.headers["user-agent"]);
    next();
});

app.use('/',router);

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

router.js������ const router=express.Router();�� ����͸� �ϳ� ������ ����,  
���� example.js�� app.get�� �����ߴ� ������ router.get���� �����Ͽ� ����ǵ��� �߽��ϴ�.  
�������� router�� ������� export�߽��ϴ�.  

example.js������ router.js���� export�ߴ� ����� const router�� �����Խ��ϴ�.  
�׸��� ���� app.get�� �����ߴ� �κ��� app.use('/',router);�� '/' ��ο� ���ؼ��� router���� ó���϶�� �̵��� ����߽��ϴ�.  

example.js�� �����Ű�� localhost:3000�� �����ϸ� ���� ������ �Ȱ��� ����� ��Ÿ���� ���� Ȯ���� �� �ֽ��ϴ�.  

���������� localhost:3000/foo �̷����� ����ø� �����߽��ϴ�.  
���࿡ localhost:3000/foo/bar�� �ּҸ� ó���Ϸ��� ��� �ؾ� �ұ��??

���� app.get('/foo/bar',...) Ȥ�� router.get('/foo/bar',...)�� ������� ó���� ������ �Ұ̴ϴ�.  
���࿡ �̷��� ������� ��Ȳ���� localhost:3000/foo/baz ��� �ּҸ� �߰��� ó���Ϸ���  
app.get('/foo/baz',...) Ȥ�� router.get('/foo/baz',...)�� �� �ۼ��Ͽ� ó���ؾ��ұ��??  

���� �ƴմϴ�.  
�ΰ����� ����� �ֽ��ϴ�.  

ù��°�� ���ϵ� ī���� ����Դϴ�.  
���α׷����� ���ϸ鼭 �ַ� ���� ���ϵ� ī��� ? �̳� * ���� �ֽ��ϴ�.  
?�� �ǹ̴� �ƹ��ų� �� ���ڸ� �ǹ��ϰ�, *�� �ƹ��ų��� �ǹ��մϴ�.  
��, ���ϵ� ī��� �ƹ��ų��� ���մϴ�.  
�̷� ���ϵ� ī�带 ����ÿ��� ����Ҽ� �ֽ��ϴ�.  

```javascript
//wildcard.js
const express=require('express');
const app=express();

app.get('/id/:number',(req,res)=>{
    const num=req.params.number;
    res.send(num);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

wildcard.js�� �����Ű��  
localhost:3000/id/(�ƹ����ڳ�����)�� �����ϸ� �Է��� ���ڳ� ���ڰ� ��µǴ� ���� Ȯ���� �� �ֽ��ϴ�.  
app.get�� �ּҿ� �ݷ�(':')�� �̿��� ���ϵ� ī�� number�� ����� �ξ����ϴ�.  
�� ���� req.params�� �ּ��� number�ڸ��� �Էµ� ���� num�� �������� res.send�� �־����ϴ�.  

�̷ν�, localhost:3000/id/(�ƹ����ڳ�����)�� ���� ������� �ذ�Ǿ����ϴ�.  

�ι�°�� �Ʊ� ��� router �̵��� Ȱ���ϴ� ����Դϴ�.  

������ �����ϱ� �ռ� ���丮 ������ ������ ���� �Ǿ��ֽ��ϴ�.  

foobar.js  
foo/  
\-index.js  
\-bar.js  
\-baz.js  

```javascript
//foobar.js  
const express=require('express');
const app=express();

const foo=require('./foo')

app.use((req,res,next)=>{
    console.log(req.headers["user-agent"]);
    next();
});

app.use('/foo',foo);

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});

///foo/index.js
const express=require('express');
const router=express.Router();

const bar=require('./bar');
const baz=require('./baz');

router.get('/bar',bar.Bar);
router.get('/baz',baz.Baz);

module.exports=router;

//foo/bar.js
exports.Bar=(req,res)=>{
    res.send("bar");
}

//foo/baz.js
exports.Baz=(req,res)=>{
    res.send("baz");
}
```

foobar.js������ app.use('/foo',foo) '/foo' ��η� ������ ��û�� foo��� ���� ó���ǵ��� �Ͽ����ϴ�.  
������ foo�� js ������ �ƴ� ���丮�Դϴ�. �̷� ��쿡�� index.js�� ����ϰ� �˴ϴ�.  
���� require('./foo')�� /foo/index.js�� import�ϰ� �˴ϴ�.  

index.js�� router�� ����ϰ�, �� ����͸� export�մϴ�.  
����, ���� foo ���丮���� bar�� baz�� import�մϴ�.
/bar�� get��û�� ������ bar.Bar�� �����ϰ�,  
/baz�� get��û�� ������ baz.Baz�� �����Ѵٴ� router.get �Լ��� �ۼ��س��ҽ��ϴ�.  

�׷��� ���⼭ �����ϼž� �Ұ��� �� /foo/index.js�� �����ϱ� ���ؼ��� �켱 example.js���� '/foo'�� ���� ������ �̷������ �մϴ�.  
�� ������ /foo/index.js�� ���ٵǱ� ������ 
/foo/index.js���� router.get�� '/bar', '/baz'��  
�����δ� localhost:3000/foo/bar �� localhost:3000/foo/baz�� ��쿡 �ش��մϴ�.  

bar.js�� baz.js�� bar���� bar, baz������ baz�� ����մϴ�.  

���ϵ�ī�带 ����ϴ� ����� ���� router �̵��� Ȱ���ϴ� ����� �ξ� �������� �˼��ֽ��ϴ�.  
�츮�� ���� ���� �����̱� ������ ���ϵ�ī�带 ����ϴ� ����� �����ϼŵ� ����մϴ�.  
�׷��� router �̵��� ����ϸ� �ҽ��ڵ尡 �������� ���Ϸ� �и��Ǿ� ���� �� ������ �ſ� �������ϴ�.  

### (3) express.static
�̹����� ������ ������ �����ϴµ� ������ �ִ� express.static �̵��� ���� �˾ƺ����� �ϰڽ��ϴ�.  
������ ������ ������ �������� �ʴ� �� ������ ����� �����ݴϴ�.  
�̹���, .html, .css, .js���� ���� �׿� �ش��ϰ�  
������ ������ ������ ���ϰ� �ݴ�� �׻� ���� ����� ���������� �ʽ��ϴ�.  
�ٷ� ������ �ƴ����� node.js�� view engine�� ejs�� �̿� �ش��մϴ�.  
(ejs, https://araikuma.tistory.com/454)

express.static�� ������ ������ �����ϴ�.  

```javascript
app.use(express.static(__dirname+'static'));
```

express.static�� ���� ����ϰ��� �ϴ� ������ ��θ� �Է��� �ֽø� �˴ϴ�.  

������ ���캸�ڽ��ϴ�.  
���丮 ������ ������ ���� �Ǿ��ֽ��ϴ�.  
staticExample.js  
static/  
\-html/  
\--index.html  
\--staticPage.html  
\-css/  
\--main.css  
\-image/  
\--logo.png  

```javascript
//staticExample.js
const express=require('express');
const app=express();

app.use(express.static(__dirname+'/static'));

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

staticExample.js�� �����Ų �� localhost:3000/html/index.html�� ������ ���ô�.  
����ü����� �ϳ��� ���� �ʾ����� index.html�������� �ε�Ǵ� ���� �˼��ֽ��ϴ�.  
�̹����� localhost:3000/html/staticPage.html�� ������ ���ô�.  
staticPage.html�� �ε�Ǵ� ���� �˼��ֽ��ϴ�.  
html������ �ε�ʰ� ���ÿ� static ���� ���ο� �ִ� css�� image�� ���� ���������� �ε�Ǵ°��� �� �� �ֽ��ϴ�.   

Ư�� ��ο����� express.static�� �۵��ϰ� �Ҽ��� �ֽ��ϴ�.
```javascript
app.use('/myhtml',express.static(__dirname+'/static'+'/html'));
```

�� ���� �ڵ带 ������ ���� �����Ѵٸ� localhost:3000/myhtml/index.html�̳� localhost:3000/myhtml/staticPage.html�� ���ٰ����մϴ�.  

�̶� express.static���� /static/html������ �ԷµǾ����Ƿ� css�� image�� ��δ� ���� express.static �̵��� �̿��Ͽ� �߰��ؾ� �մϴ�.  


### (4) body-parser
�̹����� body-parser �̵��� �̿��Ͽ� Ŭ���̾�Ʈ�κ��� �����͸� �ް� ó���ϴ� ������ ��������� �ϰڽ��ϴ�.  

body-parser �̵����� �ַ� POST�� ���� �����͸� �޴µ� ���˴ϴ�.  
�׷��� GET�� �̿��� �����ʹ� ��� �������?

GET�� POST�� ������ ���ۿ��־� ���̰� �ֽ��ϴ�.  
GET������� �����͸� �����ϸ� �ּҿ� ������Ʈ��(QueryString)�������� �����Ͱ� ������ϴ�.  
�̿� ���� POST ������� �����͸� �����ϸ� �����Ͱ� request body�� ��� ���ϴ�.  
GET ��Ŀ� ���� ���� �ο��� �ִ� ������.  

������Ʈ���� ������ ���� ������ ���մϴ�.  

���̹��� ������б��� �˻��� �� �ּҸ� ������ ���ڽ��ϴ�.  

https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=������б�

search.naver.com/search.naver ���� ?�� �����Ͽ� =�� &�� �ݺ��Ǵ� ���� Ȯ���Ҽ��ֽ��ϴ�.  

?�� �ϴ� ���� ?���ķδ� ������Ʈ���̶�� �˷��ִ� ���Դϴ�.  
������Ʈ���� ������ ���� ������ �ݺ��˴ϴ�.  
key1=value1&key2=value2&key3=value3&....  
�� �ּҷ� �ٽ� ���ư��� ������Ʈ����  
sm�� top_hty��� ���� ������, fbm�� 1, ie�� utf8, query�� �˻����� ������б���� ���� �����ٴ� ���� �˼��ֽ��ϴ�.  

�̸� �����ܿ��� ó���Ϸ��� ��� �ұ��??  

������ ����� ���丮 ������ ������ �����ϴ�.  

qsExample.js  
static/
\-html
\--qsExample.html

```javascript
//qsExample.js
const express=require('express');
const app=express();

app.use(express.static(__dirname+'/static'));

app.get('/send',(req,res)=>{
    const text=req.query.text;
    console.log("Received text:"+text);
    res.send('text='+text);
});

app.listen(3000,()=>{
    console.log('Server in running on port 3000!');
});
```

app.get('/send') ������ req.query.text�� ���� �̸��� text�� ���� value�� �����Խ��ϴ�.  
���⼭ key���� �����ϴ� ���� qsExample.html������ input �±��� name �Ӽ��Դϴ�. �̺κ��� POST������ ���̴� �� ����� �ּ���.  

qsExample.js�� �����Ű�� localhost:3000/html/qsExample.html�� ������ ���� �ƹ� �ؽ�Ʈ�� �Է��ϰ� Ȯ�� ��ư�� ���� ���ô�.  

�Է��� ���� /send�ڿ� ������Ʈ������ ���� �ܼ�â�� ������ ȭ�鿡 �Է��� ���� ��µǴ� ���� Ȯ���Ҽ��ֽ��ϴ�.  

�̹����� POST�� ��츦 �ٷﺸ�ڽ��ϴ�.  
�������� body-parser �̵��� ����� �־�� �ϰ�  
GET������ ������Ʈ������ �����Ͱ� �־����� ������ req.query�� ����������,  
POST������ body�� ��� ���� ������, req.body�� �������ֽø� �˴ϴ�.  

�켱 body-parser�� ��ġ�ϰڽ��ϴ�.  

```bash
npm install body-parser --save
```

```javascript 
//bodyparserExample.js
const express=require('express');
const app=express();
const bodyParser=require('body-parser')

app.use(express.static(__dirname+'/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.post('/send',(req,res)=>{
    const text=req.body.text;
    console.log('Received text:'+text);
    res.send(text);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

app.use���� urlencoded��� ������� ���۵� �����͸� �ްڴٶ�� bodyParser�� ����Ͽ���, (urlencoded, https://weicomes.tistory.com/10) 
app.post�� �̿��Ͽ� ������Ͽ����ϴ�.  
���� ������ �ٸ��� �����Ϳ� req.body�� ���������� �������ּ���.  

localhost:3000/html/index.html�� �����ϰ� �ؽ�Ʈ�� �Է��� ���� Ȯ���� ������ ���� ������ ���������� �Է��� ���ڰ� �������� �ܼ�â�� ����� �˴ϴ�.  

### (5) Assignment
ȸ�������� �ϴ� signup.html �������� �α����� �ϴ� login.html �������� ���� �ڷῡ �ֽ��ϴ�.  
fs ����� ����ϼŵ� �����ϰ� express.static �̵��� ����ϼŵ� ����� �����ϴ�.  
���� ����� �ϴ� app.js�� ����� �ּ���.  

1. localhost:3000�� �����ϸ� �ٷ� ȸ������ �������� redirect �ȴ�.  
2. ȸ�� ������ ���̵�(userId)�� ��й�ȣ(password)�θ� �ʿ�� �Ѵ�.  
3. ȸ�� ���� â���� ���̵�� ��й�ȣ�� �Է��ϰ� ȸ�� ���� ��ư�� ������ '/signup'�� �ּҷ� �����Ͱ� ��� ä POST ��û�� ����.  
4. �������� users��� json array�� ������ �ִ�. ȸ�� ���� �� ���۵� ���̵�� ��й�ȣ�� ���̵� users�� �̹� �����ϴ��� Ȯ���Ѵ�.  
5. �����ϸ� res.send('User already exists');�� �����ϰ� �������� ������ users�� ���ο� JSON�� �߰��ϰ� �α��� �������� redirect ��Ų��.  
6. �α���â�� ���������� ���̵�� ��й�ȣ�� �޴´�.  �α��� ��ư�� ������ '/login'�� �ּҷ� POST ��û�� ����.  
7. ������ users �迭���� �ش� ���̵� �ִ��� Ȯ���ϰ� ���� ���ٸ� res.send('ID wrong');�� �����ϰ� ���̵� ������ ��й�ȣ�� ��ġ���� ������ res.send('Password wrong');�� �����ϰ� ���̵�� ��й�ȣ�� ��� �ùٸ��� res.send("Welcome "+userId+"!");�� �����Ͽ� ȯ�������� �ۼ��Ѵ�.  
