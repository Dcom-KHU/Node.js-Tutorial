## 5. Express
���������� Node.js�� Ư¡�� ���õ� ������ ���� �˾ƺ��ҽ��ϴ�.  
�̹� ���Ǵ� Node.js�� �� Express�� ���� �˾ƺ��ڽ��ϴ�.  
### (1) HTTP ���
Express�� �����ϱ⿡ �ռ� �츮�� ����ϴ� ���ͳ��� ��� �̷������ �� �˾ƺ����� �ϰڽ��ϴ�.  

<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/2.PNG?raw=true">
�� ������ Node.js ���͵� �������� �ּ� �κ��Դϴ�.  

�ּ��� �� �տ� https�� ���� ���� Ȯ���� �� �ֽ��ϴ�.  
HTTPS�� HTTP ��ſ��� ������ ������ ����Դϴ�.  
�ƹ�ư HTTP ����̶� ū Ʋ�� ����մϴ�.  

HTTP ����� ������ ���� �������� �̷�� ���ϴ�.  
<img src="https://raw.githubusercontent.com/JJuOn/2019-Node.js-Study/master/img/3.png">
1. Ŭ���̾�Ʈ(�� ������)�� �������� URL(�ڿ��� ��ġ)�� URI(�ڿ��� �ĺ���)�� ���� ��û(Request)�Ѵ�.
1. ������ �׿� �´� ����(Response)�� ���ش�.

���ø� ���ڽ��ϴ�.  
�츮�� ���̹��� �����ϰ��� �մϴ�.  
�츮�� ���̹��� �ʷ� �˻�â�� ���µ� ������ ������ ���� ������ �̷�����ϴ�.  
1. Ŭ���̾�Ʈ(�� ������)�� �������� https://www.naver.com �� �ּҷ� GET ����� ��û(Request)�� �Ѵ�.  
1. ������ https://www.naver.com �� �ּҷ� GET ����� Request�� �� ���� Ȯ���ϰ� �׿� �ش��ϴ� html ������ ����(Response)�� �����ش�.  

�츮�� �̷��� ������ ���� Ȯ���� �� �ֽ��ϴ�.  
�ٷ� Chrome�� ������ ������ �̿��ϸ� �˴ϴ�.  

ũ�� �������� ���� ���̹��� ������ �� F12�� �������ô�.  

�� ���� Network ���� ���� ���ó�.  
�� ũ�Ѹ��� �غ��� ���̶�� �ͼ��� ȭ���� ������ �� ���Դϴ�.  
���� Network �ǿ� �ƹ��� ���뵵 ���� �ʴ´ٸ� Ctrl+R�� ���� �������� ���� �ҷ��� ���ô�.  
<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/4.PNG?raw=true">  
�� ������ ���� ���� �αװ� �ߴ� ���� Ȯ���� �� �ֽ��ϴ�.  
�� �߿��� ���� ���� www.naver.com �̶� �����ִ°��� Ŭ���� ���ô�.  
<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/5.PNG?raw=true">  
�׷��� �Ǹ� HTTP ����� ��� �̷���� �ִ� �� Headers ���� �����Ͽ� Preview, Response ��� �پ��� ������ ǥ�õ˴ϴ�.  

Headers���� HTTP ����� �� �� �� request�� � request����, �� response�� � response���� ������ ������ ��� �ֽ��ϴ�.  

Response �ǿ��� ������ ���� ������ �� �ְ�  
Preview ���� �� response �� ���� ���� �ٲپ� �����ݴϴ�.  

�ٽ� Headers ������ ���ư��� General�� Request method�� GET���� ǥ���Ǵ°��� �� �� �ֽ��ϴ�.  
Request method�� � ������� �������� ��û�� �� ���ϴ� ���Դϴ�.  
���� ���̴� (��� ���� �ΰ����� ���� �� ���� ����) http method�� ������ �����ϴ�.  
- GET : ��ȸ
- POST : ����
- PUT : ����
- DELETE : ����

�׷����� ������ ������ ��Ʈ��ũ���� ���� �� 99%�� GET�� �� 1%�� POST�� �����Ǿ� �ִ� ���� ���� ã�� �� ���� ���Դϴ�.  

�׷��� GET�� POST�� ������ ������ �帮���� �մϴ�.  
GET ����� URL(URI)�� �̿��ؼ� ������ ���� �����ͳ� ������ �������� �뵵�� �ַ� ����մϴ�.  
html ������ �����κ��� �޾ƿ´ٰų�,  css �����̳� js ������ �ε��ϰų�, �̹��� ������ �ε��ϴ°� ���� GET ������� �̷�� ���ϴ�.  
POST ����� ������ �����͸� �����ϴ� �뵵�� �ַ� ����մϴ�.  
ȸ�������� �ϰų�, �α����� �ϰų�, �Խù� Ȥ�� ����� �ۼ��ϴ� ���� POST ������� �̷�� ���ϴ�.  
�������� ������ ������ ���� POST�� �¶��� ����â���� ���ΰ�ħ�� ������ ��� �ٽ� ���� Ȯ���̶�� ������ ������ �̴ϴ�.  
������ ���࿡ POST ����� �ƴ϶� GET ������� �̷�����ٸ� ���ΰ�ħ�� ������ ������ ������ �ݺ��ǿ� ������ �ɰ��Դϴ�.  

���������� Headers �ǿ��� �� ���� �ϳ� �� �ֽ��ϴ�.  
�ٷ� Status Code �Դϴ�.  
Status code�� response�� header�� �����ϸ� HTTP ����� ��� �̷�������� ���ڸ��� ���ڷ� ǥ���� ���Դϴ�.  
���̹��� �ʷϻ� �˻�â�� ����� ���̽Ŵٸ� �Ƹ� Status Code���� 200�� ǥ�õǾ� �������Դϴ�.  
���� 404�� ���� ������ �ٵ���.  
404�� �������� �ʴ� �ּҷ��� �����Դϴ�.  
���� Status code�� ������,  
������ �������ڸ� 200�� �ƹ� ���� ���� ���������� http ����� �Ϸ�� ���Դϴ�.  
300���� status code�� redirection�� ���õ� ����Դϴ�.  
400���� status code�� �ַ� Ŭ���̾�Ʈ(�����)�� �߸��� ����̸�,  
500���� status code�� �ַ� ������ �߸��� ����Դϴ�.  

Status Code�� ���� �� �˾ƺ��� �����ôٸ� ���� ������ ������ �ּ���.  
(HTTP Status code, https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

### (2) Npm
npm�� Node Package Manager�� ���ڷ� Node.js�� ��Ű��(���)�� ��ġ, ���� �� ������Ʈ�� �����ݴϴ�.  
�ռ� Introduction���� ��� �ߴ� �ٿ� ���� Node.js�� ������ ��Ű���� ����� �����մϴ�.  
���� ���ǿ��� ����ߴ� fs ����� Node.js�� ����Ǿ��ִ� ����̱⿡ ���� ��ġ�� �ʿ����� �ʾҽ��ϴ�.  
������ ������ ����� ���� Node.js�� ��ġ�԰� ���ÿ� ��� ����� ��ġ�Ѵٸ� �Ƹ� ��ǻ���� ��������� Node.js�� ���� ���� �� ���Դϴ�.  
�׷��� ����ڿ��� �ʿ��� ��⸸ �����Ͽ� ��ġ�ϵ��� ���ִ� ���� �ٷ� npm�Դϴ�.  
Python�� pip�� ����� ������ �մϴ�.  

�ٷ� �ѹ� ������ ���ô�.  
���� Node.js�� �����ߴ� ������ �ѹ� �� ���ô�.  
����μ�  

1. Introducion  
1. Functions
1. Promise
1. Modules  
...   

�� ���� ���̴� ������ �ǰڳ׿�.  
webstorm�̳� visual studio code�� ���� terminal�� ������ �ִ� ide�� ����ϰ� ��ôٸ� ���� ��ġ�� Ȯ���� �ּ���.  

terminal�� ������ ���� �ʴ� ȯ�濡�� �����ϰ� ��ôٸ� cmd�� ���� �ּ���.  

���� ��ġ�� �ùٸ��� �ʴٸ� ������ ���� ��ɾ�� ���� ��ġ�� �ٲپ� �ݽô�.  
```bash
cd (���� ��ġ���� �Ű� �� ����)
```
���� ���� ������ ���ư��� �����ôٸ� ������ ���� ��ɾ �Է��� �ּ���.  
```bash
cd ..
```

������ ��ġ�� �°� ã�������� ������ ���� ��ɾ �Է��� �ּ���.
```bash
npm init
```
�پ��� �Է��� �����ٵ� ������ ó�� ���ϴ� �ܰ��̴� ���ϰ� �� enter�� �����ֽø� �˴ϴ�.  

�׷��� �ش� ��ġ�� package.json�� ������� Ȯ�� �� �� �ֽ��ϴ�.  

���� package.json���� npm init�� �� �� �Է¹��� ������Ʈ�� ������ ǥ�õǾ� �ֽ��ϴ�.  

����� ��ġ�ϴ� ����� ������ �����ϴ�.  
package.json�� ��ġ�� �ִ� �������� terminal�� �� ����
```bash
npm install (����) --save
```
�� �Է��ϸ� ����� ��ġ�� �˴ϴ�.  
��, ���ͳ��� �� ����Ǿ� �־�� �մϴ�.  

�̹� ���ǿ��� express ����� ����� �����̱� ������ ���� ��ɾ �Է��Ͽ� express ����� ��ġ�� �ݽô�.  
```bash
npm install express --save
```

��ġ�� �Ϸ�Ǹ� node_modules/ ��� ������ package-lock.json�� �����ǰ�,  
package.json���� dependencies�� express�� �߰� �Ǿ����ϴ�.  

(����)  
Git�� ����ϽŴٸ�(GitHub ����, add, commit, push�� �̿��Ͽ� ������ �����Ͻô� �п� �ش�)
node_modules/ �� �� .gitignore�� ���Խ����ּž��մϴ�.  
���ϼ��� ���� ������Ʈ ������ �������� �� �� �ְ�, ������ ���� �缳ġ�� �����ϱ� ������ add �� �ʿ䰡 �����ϴ�.  

���� �ٸ� ��(GitHub)���� node.js ������Ʈ ������ ������ ������ �ִ� ����� ��ġ�ϰ��� �ϽŴٸ�  
�켱 package.json�� �ִ��� Ȯ���ϰ�  
```bash
npm install
```
�� ��ɾ �Է��� �ֽø� package.json�� �ִ� dependencies�� �����Ͽ� �ش� ������ �ڵ����� ��ġ�˴ϴ�.  

### (3) Express
Express�� Node.js ����� �� �����ӿ�ũ�Դϴ�.  
�����ӿ�ũ�� Ư�� ����� �����ϱ� ���� ���� ���̺귯���� �����̶�� �����Ͻø� ���մϴ�.  
�� �����ӿ�ũ�δ� python�� django�� java�� spring, php�� lalavel���� �ֽ��ϴ�.  

�ٷ� ������ ������ �ϰڽ��ϴ�.
```javascript
// myFirstApp.js
const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Hello My First Server');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```
�� �ҽ��ڵ带 �����ϸ� Server is running on port 3000!�̶�� �޼����� �ܼ�â�� ��µ˴ϴ�.  
�� �������� �Ѱ� localhost:3000 Ȥ�� 127.0.0.1:3000�� �ּҷ� ������ ���ô�.  
Hello My First Server�� ��µǴ� ���� Ȯ�� �� �� �ֽ��ϴ�.  

�ҽ��ڵ带 �������ڸ�  
require�� ���� express ����� �ҷ��� ��,  
express();�� ���� ��ü�� �ϳ� �����մϴ�.  
�� �������δ� '/' �ּҷ� GET ����� request�� ���� callback �Լ��� �����Ͽ� response�� �����ϴ� app.get �Լ��� �ֽ��ϴ�.  
callback �Լ� ���ο��� 'Hello My First Server'��� ���ڿ��� response�� �����ϴ� ������ �ϴ� res ��ü�� �޼ҵ��� res.send()�� �ֽ��ϴ�.  
���������� app.listen(portNum,callback)���� �ش� ��Ʈ ��ȣ�� ������ �۵� ��Ű�� callback�Լ��� ������ �۵����̶�� �޽����� �ܼ�â�� ����մϴ�.  

�̹��� �ٸ� ��ο� ���� ������ �ٷﺸ�ڽ��ϴ�.  

```javascript
//firstSecond.js
const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Index Page');
});

app.get('/first',(req,res)=>{
    res.send('First Page');
});

app.get('/second',(req,res)=>{
    res.send('Second Page');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```
�� �ҽ��ڵ带 ������ ��  
localhost:3000  
localhost:3000/first
localhost:3000/second

�� �ּҿ� ������ ���ô�.  
������ �ּҿ� ���� ���������� �ٸ� ������ �ߴ°��� Ȯ�� �� �� �ֽ��ϴ�.  

�̹����� html �±� �� ���� �����غ����� �ϰڽ��ϴ�.  
```javascript
//sendHtmlTag.js
const express=require('express');
const app=express();

app.get('/bold',(req,res)=>{
    res.send('<b>bold</b>');
});

app.get('/italic',(req,res)=>{
    res.send('<i>italic</i>');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

�� �ҽ��ڵ带 �����Ų ��  
localhost:3000/bold �� �����ϸ� ���� �۾���  
localhost:3000/italic ���� �����ϸ� ������ �۾��� ��µǴ� ���� Ȯ�� �� �� �ֽ��ϴ�.  

�̹����� fs ����� �̿��Ͽ� html ������ ��°�� response �غ��ô�.  
```javascript
//sendHtmlFile.js
const fs=require('fs');
const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    fs.readFile('./index.html',(err,data)=>{
        if (err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

fs ����� readFile �Լ��� �̿��Ͽ� '/' �ּҷ� GET ��û�� ������ 'index.html'�� ã�� �������� �Ѱ��־����ϴ�.  
res ��ü�� writeHead �޼ҵ�� ������ ���� �ۼ��մϴ�.  
res.writeHead(status code, headers)  
���⿡ headers���� �Ʊ� HTTP ��ſ��� ���캸�Ҵ� response header�� �ش��մϴ�.  

�̹����� GET ��û�� POST ��û�� ó���غ��ڽ��ϴ�.  

```javascript
//handleMethods.js
const fs=require('fs');
const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    fs.readFile('./index.html',(err,data)=>{
        if (err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/test',(req,res)=>{
    console.log('GET /test');
    res.send('GET');
});

app.post('/test',(req,res)=>{
    console.log('POST /test');
    res.send('POST');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

�� �ҽ��ڵ带 ������ ���� localhost:3000�� �����غ��ô�.  
���� ������ ���� index.html�� fs ����� ���� �о� �� �������� response�� ���½��ϴ�.  
localhost:3000 ����
GET ��ư�� ������ /test�� �ּҷ� GET request�� ���۵˴ϴ�.  
POST ��ư�� ������ /test�� �ּҷ� POST request�� ���۵˴ϴ�.  

�ٽ� localhost:3000���� ���ƿ� ��  
�̹��� ��ư�� Ŭ������ �ʰ� �ּ�â�� localhost:3000/test �� �Է��� ���ڽ��ϴ�.  
GET�̶�� �����ϴ°��� ���� �Ϲ������� �ּ�â�� �ּҸ� �Է��Ͽ� �����ϴ� ���� GET ������� Ȯ���� �� �ֽ��ϴ�.  

���������� a �±��� href �Ӽ��� GET ����� ��û�� �� �ݴϴ�.  

�̹����� request�� �ް� �ٸ� �ּҷ� redirection�� �� �� ���ô�.  
```javascript
//redirection.js
const fs=require('fs');
const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    fs.readFile('./index.html',(err,data)=>{
        if (err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/test',(req,res)=>{
    console.log('GET /test');
    res.send('GET');
});

app.post('/test',(req,res)=>{
    console.log('POST /test');
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

�ҽ��ڵ带 ������ ���� localhost:3000�� ������ ���ô�.  

GET ��ư�� ���� ������ ���� ����������, POST ��ư�� ������ �ܼ�â���� "POST /test"�� ��µǰ�  
�ٽ� ������������ ���ƿ� ���� Ȯ�� �� �� �ֽ��ϴ�.  

### (4) Assignment
���� ���ǿ� �´� app.js �� �ۼ��� �ּ���.  

app.js���� counter��� ������ ����Ǿ� ������ 0���� �ʱ�ȭ �Ǿ��ֽ��ϴ�.  

localhost:3000�� counterMain.html�� �����ݴϴ�.  

Increase ��ư�� ������ /increase�� POST request�� �߻��ϰ�  
���������� ���� counter�� ���� 1 ������Ų ���� localhost:3000���� redirect ���ݴϴ�.  

Decrease ��ư�� ������ /decrease�� POST request�� �߻��ϰ�  
���������� ���� counter�� ���� 1 ���ҽ�Ų ���� localhost:3000���� redirect ���ݴϴ�.  

Show ��ư�� ������ /show�� GET request�� �߻��ϰ� counter�� ���� response�� ������ �ݴϴ�.  

�����ڷῡ html������ �����Ǿ� ������ app.js�� ���� �ۼ����ֽø� �˴ϴ�.  
