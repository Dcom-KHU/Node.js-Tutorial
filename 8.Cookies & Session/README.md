## 8. Cookies & Session   
이번 강의는 쿠키와 세션에 대해 다뤄보도록 하겠습니다.  

쿠키와 세션이 무엇인지 알아보기 전에 쿠키와 세션이 필요하게 된 배경에 대해서 알아보도록하겠습니다.  
HTTP 통신은 두가지의 특성을 지닙니다.  
- 비연결 (Connectionless)
- 무상태 (Stateless)

Connectionless는 클라이언트(=브라우저)가 서버에게 request를 보내고, 서버는 클라이언트에게 response를 보내면 더 이상의 연결을 하지 않는다는 뜻입니다.  
이를 확인할 수 있는 부분은, 우리가 한 사이트에 접속하여 완전한 페이지를 받았으면 다른 사이트로 이동하지 않는 이상 인터넷과 연결을 해제해도 사이트 화면이 그대로 유지됩니다.  
만약 서버와 계속 통신하고 있는 상태였다면 인터넷이 끊긴 즉시 이미 불러온 페이지도 볼 수 없게 됩니다.  

Stateless는 상태정보를 저장하지 않아 이전 request와 무관한 request를 독립적으로 처리한다는 의미입니다.  
Connectionless에 의해 request와 response를 주고 받아 통신이 끊어진다면 이전 상태 정보는 저장하지 않습니다.  

하지만 우리가 웹서비스를 이용하면서 사용하는 자동 로그인, 쇼핑몰의 최근 본 상품 목록, 오늘 더이상 팝업을 보지 않음 등은 우리가 자동 로그인에 체크를 한 것과, 어떤 상품을 보았는지, 팝업 안보겠다고 체크한 것까지 누군가(클라이언트 혹은 서버)는 기억을 했기에 구현되는 기능입니다.  

HTTP 프로토콜은 이런 기억을 못합니다.  
그렇다면 누가 기억하는 걸까요?  
바로 쿠키와 세션입니다.  

쿠키와 세션은 금붕어의 기억력을 가진 HTTP 프로토콜의 단점을 보완하기 위해 등장했습니다.  

쿠키와 세션의 역할은 비슷하나 차이점은 누가 기억하는지에 따라 달려있습니다.  

쿠키는 클라이언트와 서버가 사용하며 클라이언트가 기억하는 것이고, 세션은 서버가 사용하며 서버가 기억하는 것입니다.  

### (1) Cookies
일단 쿠키를 눈으로 직접 찾아 보겠습니다.  
이전 강의와 동일하게 네이버에 접속해서 F12를 눌러보도록 하겠습니다.  

6강 Express에서는 network 탭을 들여다 보았지만 이번에는 Application 탭을 눌러봅시다.  
그러고 개발자 도구의 좌측을 보면 Storage의 Cookies를 찾을 수 있습니다.  

그 다음에 https://www.naver.com 을 보면 다음과 같은 창이 출력됩니다.  

<img src="https://github.com/JJuOn/Node.js-Tutorial/blob/master/img/6.PNG?raw=true">

위 화면에서 알 수 있는 것은 7개의 쿠키가 존재하며, 각각의 값과 도메인, 경로, 만료일 등이 나타나있습니다.  
이러한 쿠키들은 클라이언트에서 서버로 request를 보낼 때 자동으로 포함이 됩니다.  
쿠키들이 어떻게 포함되었나 확인해 보시려면 개발자 도구의 network 탭에서 클라이언트가 서버로 request를 보낼 때   
request headers를 확인하면 cookie: 하고 포함된 쿠키들이 name=value; 가 반복된 형태로 들어가게 됩니다.  

이러한 쿠키들은 어떻게 만들어지는 걸까요?  
response headers의 set-cookie를 통해 name=value;형식으로 입력해 준다면 클라이언트에 쿠키가 생성됩니다.  
또는 클라이언트에서 자바스크립트를 이용해 다음과 같이 쿠키를 생성할수도 있습니다.  
```javascript
document.cookie="name=value";
```

이번엔 cookie-parser 미들웨어를 이용해서 쿠키를 생성하고 호출하는 예제를 진행하도록 하겠습니다.  

cookie-parser 모듈을 설치해 봅시다.  
```bash
npm install cookie-parser --save
```
```javascript
//cookieParser.js
const cookieParser=require('cookie-parser');
const fs=require('fs');
const express=require('express');

const app=express();

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

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
app.use(cookieParser());를 통해 cookie-parser 미들웨어를 등록해 줍니다.  
cookie-parser를 사용하면 req.cookies로 cookie 값을 읽어올 수 있습니다.  
/get으로 GET 요청을 보내면 현재 브라우저에 저장된 쿠키들을 출력해 줍니다.  
/set으로 POST 요청을 보내면 fruit이라는 이름의 쿠키의 value를 설정해 줍니다.  

cookieParser.js를 실행하고 localhost:3000에 접속해 봅시다.  
fruit에 넣을 value를 입력하고 submit 버튼을 눌러봅시다.  
그 다음에 localhost:3000/get에 접속하면 방금 입력한 fruit의 값이 반영된 쿠키들을 조회할 수 있습니다.  
localhost:3000 으로 되돌아가서 새로운 값을 입력하고 localhost:3000/get에 접속하면 fruit의 값이 바뀐것을 알 수 있습니다.  

### (2) Session
쿠키는 웹 브라우저에 데이터를 저장하는 방식이었습니다.  
그런데, 로그인 상태를 유지할 때도 쿠키를 사용하면 어떻게 될까요?  
쿠키에 아이디와 비밀번호를 저장한다면 우리가 개발자 도구를 통하여 보았듯이 누구나 볼수 있고, 또한 수정도 가능하게 될 것입니다.  
보안상 매우 취약해 진 것이죠.  
그래서 로그인 상태와 같은 보안상 중요한 정보는 웹 브라우저가 아닌 웹 서버에 저장 됩니다.  
이를 세션이라고 합니다.  

그렇다면 서버는 어떻게 여러 사용자를 구분할 수 있을까요?  
서버는 세션을 저장함과 동시에 클라이언트에게 세션을 구분할 수 있는 세션 아이디를 쿠키에 저장하게 합니다.  
클라이언트가 서버에게 request를 할 때 담겨오는 쿠키의 세션 아이디를 통해 사용자를 식별할 수 있습니다.  

세션을 이용하기 위해서는 express-session이라는 모듈을 사용해야합니다.  
우선 설치해 봅시다.  
```bash
npm install express-session --save
```

```javascript
//sessionExapmle.js
const express=require('express');
const fs=require('fs');
const app=express();
const session=require('express-session');

app.use(bodyParser.urlencoded({extended:false}));
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
const session=require('express-session');으로 express-session 모듈을 불러왔습니다.  
app.use(session({...}));으로 미들웨어를 등록했습니다.  
이 안의 option들을 간단히 설명하자면  
- secret : 쿠키를 임의로 변조하는 것을 방지하기 위해, 세션 암호화에 사용되는 값.
- resave : 세션을 언제나 저장할지 결정.
- saveUninitialized : 세션이 저장되기 전에 uninitialized 상태로 저장할 지.  

(express-session options, https://www.npmjs.com/package/express-session#options)

이제 req.session.(name)으로 세션에 접근할 수 있습니다.  

'/get'으로 GET 요청을 보내면 우선 session에 fruit이 있는지 확인합니다.  
fruit 정의되어 있으면 fruit의 값을 req.session.fruit을 출력해 줍니다.  
만약 fruit이 정의되지 않았으면 'No session!'을 출력해 줍니다.  

'/set'으로 POST 요청을 보내면 req.session.fruit의 값을 설정하거나 변경해 줍니다.  

'/delete'로 GET 요청을 보내면 세션을 삭제하는 req.session.destory을 실행하고, callback 함수를 실행합니다.  

localhost:3000에 접속하여 fruit의 값을 입력하여 submit 버튼을 눌러 줍니다.  
localhost:3000/get에 접속하면 방금 입력된 값을 확인할 수 있습니다.  
이전의 쿠키에서의 예제와 비슷한 기능을 합니다.  
차이점을 한번 살펴보겠습니다.  
개발자도구(F12) - Application - Stroage - Cookie를 확인해 봅시다.  

별다른 설정을 하지 않았으면 connect.sid라는 쿠키가 생성된 것을 알 수 있습니다.  
웹 서버는 세션을 생성하고 이 세션의 식별자인 session id(=sid)를 암호화하여 웹브라우저에 전달해 줍니다.  
서버는 웹 브라우저의 세션 아이디로 세션을 식별할 수 있습니다.  

localhost:3000/delete를 실행하면 세션이 삭제되고, localhost:3000/get에 접속하면 No session이라고 출력이 되는것을 확인할 수 있습니다.  

### (3) Assignment
7강 Middlewares의 과제 app.js에 다음 추가기능을 구현해 봅시다.  
1. signup.html에 학과, 이름 등 4가지 회원정보 추가. login.html은 이전과 동일.
1. app.js의 users array를 1.에서 추가한 회원정보의 맞게 수정, 회원 가입시 추가된 회원정보도 함께 고려. 
1. 이전과 동일하게 /login 으로 POST 요청을 보내면 로그인 진행후, req.session.userId에 회원 아이디(userId) 저장 후 '/profile'로 redirect
1. '/profile'에 GET 요청이 들어오면 res.session.userId를 바탕으로 users array에서 회원을 찾은 후, 비밀번호를 제외한 회원정보를 자유롭게 출력.  
