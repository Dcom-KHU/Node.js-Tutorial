## 5. Express
이전까지는 Node.js의 특징과 관련된 문법에 대해 알아보았습니다.  
이번 강의는 Node.js의 꽃 Express에 대해 알아보겠습니다.  
### (1) HTTP 통신
Express를 시작하기에 앞서 우리가 사용하는 인터넷이 어떻게 이루어지는 지 알아보도록 하겠습니다.  

<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/2.PNG?raw=true">
위 사진은 Node.js 스터디 페이지의 주소 부분입니다.  

주소의 맨 앞에 https가 붙은 것을 확인할 수 있습니다.  
HTTPS는 HTTP 통신에서 보안이 개선된 방식입니다.  
아무튼 HTTP 통신이랑 큰 틀은 비슷합니다.  

HTTP 통신은 다음과 같은 구조에서 이루어 집니다.  
<img src="https://raw.githubusercontent.com/JJuOn/2019-Node.js-Study/master/img/3.png">
1. 클라이언트(웹 브라우저)는 서버에게 URL(자원의 위치)나 URI(자원의 식별자)를 통해 요청(Request)한다.
1. 서버는 그에 맞는 응답(Response)을 해준다.

예시를 들어보겠습니다.  
우리는 네이버에 접속하고자 합니다.  
우리가 네이버의 초록 검색창을 보는데 까지는 다음과 같은 과정이 이루어집니다.  
1. 클라이언트(웹 브라우저)는 서버에게 https://www.naver.com 의 주소로 GET 방식의 요청(Request)을 한다.  
1. 서버는 https://www.naver.com 의 주소로 GET 방식의 Request가 온 것을 확인하고 그에 해당하는 html 파일을 응답(Response)로 보내준다.  

우리는 이러한 과정을 직접 확인할 수 있습니다.  
바로 Chrome의 개발자 도구를 이용하면 됩니다.  

크롬 브라우저를 통해 네이버에 접속한 후 F12를 눌러봅시다.  

그 다음 Network 탭을 눌러 봅시나.  
웹 크롤링을 해보신 분이라면 익숙한 화면이 나오게 될 것입니다.  
만약 Network 탭에 아무런 내용도 뜨지 않는다면 Ctrl+R을 눌러 페이지를 새로 불러와 봅시다.  
<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/4.PNG?raw=true">  
위 사진과 같이 많은 로그가 뜨는 것을 확인할 수 있습니다.  
그 중에서 가장 위의 www.naver.com 이라 적혀있는것을 클릭해 봅시다.  
<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/5.PNG?raw=true">  
그렇게 되면 HTTP 통신이 어떻게 이루어져 있는 지 Headers 부터 시작하여 Preview, Response 등등 다양한 정보가 표시됩니다.  

Headers에는 HTTP 통신을 할 때 이 request가 어떤 request인지, 이 response가 어떤 response인지 간략한 설명이 담겨 있습니다.  

Response 탭에는 실제로 받은 응답이 들어가 있고  
Preview 탭은 이 response 를 보기 좋게 바꾸어 보여줍니다.  

다시 Headers 탭으로 돌아가서 General에 Request method가 GET으로 표현되는것을 볼 수 있습니다.  
Request method란 어떤 방식으로 서버에게 요청할 지 정하는 것입니다.  
흔히 쓰이는 (사실 뒤의 두가지는 아직 본 적이 없는) http method는 다음과 같습니다.  
- GET : 조회
- POST : 생성
- PUT : 변경
- DELETE : 삭제

그렇지만 개발자 도구의 네트워크탭을 보면 약 99%의 GET과 약 1%의 POST로 구성되어 있는 것을 쉽게 찾을 수 있을 것입니다.  

그래서 GET과 POST만 간략히 설명해 드리려고 합니다.  
GET 방식은 URL(URI)를 이용해서 서버로 부터 데이터나 정보를 가져오는 용도로 주로 사용합니다.  
html 파일을 서버로부터 받아온다거나,  css 파일이나 js 파일을 로드하거나, 이미지 파일을 로드하는것 또한 GET 방식으로 이루어 집니다.  
POST 방식은 서버로 데이터를 전송하는 용도로 주로 사용합니다.  
회원가입을 하거나, 로그인을 하거나, 게시물 혹은 댓글을 작성하는 것은 POST 방식으로 이루어 집니다.  
여러분이 경험해 보셨을 만한 POST는 온라인 결제창에서 새로고침을 누르면 양식 다시 제출 확인이라는 문구를 보셨을 겁니다.  
결제가 만약에 POST 방식이 아니라 GET 방식으로 이루어진다면 새로고침을 진행할 때마다 결제가 반복되에 텅장이 될것입니다.  

마지막으로 Headers 탭에서 볼 것이 하나 더 있습니다.  
바로 Status Code 입니다.  
Status code는 response의 header에 존재하며 HTTP 통신이 어떻게 이루어졌는지 세자리의 숫자로 표시한 것입니다.  
네이버의 초록색 검색창이 제대로 보이신다면 아마 Status Code에는 200이 표시되어 있을것입니다.  
흔히 404는 많이 보셨을 텐데요.  
404는 존재하지 않는 주소로의 접근입니다.  
많은 Status code가 있지만,  
간단히 정리하자면 200은 아무 문제 없이 정상적으로 http 통신이 완료된 것입니다.  
300대의 status code는 redirection과 관련된 경우입니다.  
400대의 status code는 주로 클라이언트(사용자)의 잘못인 경우이며,  
500대의 status code는 주로 서버의 잘못인 경우입니다.  

Status Code에 대해 더 알아보고 싶으시다면 다음 문서를 참고해 주세요.  
(HTTP Status code, https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

### (2) Npm
npm은 Node Package Manager의 약자로 Node.js의 패키지(모듈)의 설치, 삭제 및 업데이트를 도와줍니다.  
앞서 Introduction에서 언급 했던 바와 같이 Node.js는 수많은 패키지와 모듈을 지원합니다.  
이전 강의에서 사용했던 fs 모듈은 Node.js에 내장되어있는 모듈이기에 따로 설치가 필요하지 않았습니다.  
하지만 수많은 모듈을 전부 Node.js를 설치함과 동시에 모든 모듈을 설치한다면 아마 컴퓨터의 저장공간은 Node.js의 모듈로 가득 찰 것입니다.  
그래서 사용자에게 필요한 모듈만 선택하여 설치하도록 해주는 것이 바로 npm입니다.  
Python의 pip와 비슷한 역할을 합니다.  

바로 한번 시작해 봅시다.  
여태 Node.js를 공부했던 폴더로 한번 들어가 봅시다.  
현재로선  

1. Introducion  
1. Functions
1. Promise
1. Modules  
...   

와 같이 보이는 폴더가 되겠네요.  
webstorm이나 visual studio code와 같이 terminal를 지원해 주는 ide를 사용하고 계시다면 현재 위치를 확인해 주세요.  

terminal를 지원해 주지 않는 환경에서 공부하고 계시다면 cmd를 열어 주세요.  

현재 위치가 올바르지 않다면 다음과 같은 명령어로 현재 위치를 바꾸어 줍시다.  
```bash
cd (현재 위치에서 옮겨 갈 폴더)
```
만약 상위 폴더로 돌아가고 싶으시다면 다음과 같은 명령어를 입력해 주세요.  
```bash
cd ..
```

폴더의 위치를 맞게 찾으셨으면 다음과 같은 명령어를 입력해 주세요.
```bash
npm init
```
다양한 입력을 받을텐데 아직은 처음 접하는 단계이니 쿨하게 다 enter를 눌러주시면 됩니다.  

그러면 해당 위치에 package.json이 생긴것을 확인 할 수 있습니다.  

현재 package.json에는 npm init을 할 때 입력받은 프로젝트의 정보가 표시되어 있습니다.  

모듈을 설치하는 방법은 다음과 같습니다.  
package.json이 위치해 있는 폴더에서 terminal을 연 다음
```bash
npm install (모듈명) --save
```
를 입력하면 모듈이 설치가 됩니다.  
단, 인터넷이 꼭 연결되어 있어야 합니다.  

이번 강의에서 express 모듈을 사용할 예정이기 때문에 다음 명령어를 입력하여 express 모듈을 설치해 줍시다.  
```bash
npm install express --save
```

설치가 완료되면 node_modules/ 라는 폴더와 package-lock.json이 생성되고,  
package.json에는 dependencies에 express가 추가 되었습니다.  

(참고)  
Git을 사용하신다면(GitHub 말고, add, commit, push를 이용하여 과제를 제출하시는 분에 해당)
node_modules/ 는 꼭 .gitignore에 포함시켜주셔야합니다.  
파일수도 많아 프로젝트 폴더가 지저분해 질 수 있고, 모듈들은 쉽게 재설치가 가능하기 때문에 add 될 필요가 없습니다.  

만약 다른 곳(GitHub)에서 node.js 프로젝트 폴더를 가져와 기존에 있던 모듈을 설치하고자 하신다면  
우선 package.json이 있는지 확인하고  
```bash
npm install
```
위 명령어만 입력해 주시면 package.json에 있는 dependencies를 참고하여 해당 모듈들이 자동으로 설치됩니다.  

### (3) Express
Express는 Node.js 기반의 웹 프레임워크입니다.  
프레임워크는 특정 기능을 수행하기 위한 많은 라이브러리의 묶음이라고 이해하시면 편합니다.  
웹 프레임워크로는 python의 django나 java의 spring, php의 lalavel등이 있습니다.  

바로 시작해 보도록 하겠습니다.
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
위 소스코드를 실행하면 Server is running on port 3000!이라는 메세지가 콘솔창에 출력됩니다.  
웹 브라우저를 켜고 localhost:3000 혹은 127.0.0.1:3000의 주소로 접속해 봅시다.  
Hello My First Server가 출력되는 것을 확인 할 수 있습니다.  

소스코드를 설명하자면  
require를 통해 express 모듈을 불러온 후,  
express();를 통해 객체를 하나 생성합니다.  
그 다음으로는 '/' 주소로 GET 방식의 request가 오면 callback 함수를 실행하여 response를 설정하는 app.get 함수가 있습니다.  
callback 함수 내부에는 'Hello My First Server'라는 문자열을 response로 전달하는 역할을 하는 res 객체의 메소드인 res.send()가 있습니다.  
마지막으로 app.listen(portNum,callback)으로 해당 포트 번호로 서버를 작동 시키며 callback함수로 서버가 작동중이라는 메시지를 콘솔창에 출력합니다.  

이번엔 다른 경로에 대한 접근을 다뤄보겠습니다.  

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
위 소스코드를 실행한 후  
localhost:3000  
localhost:3000/first
localhost:3000/second

세 주소에 접속해 봅시다.  
접속한 주소에 따라 웹페이지에 다른 문구가 뜨는것을 확인 할 수 있습니다.  

이번에는 html 태그 한 줄을 전송해보도록 하겠습니다.  
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

위 소스코드를 실행시킨 후  
localhost:3000/bold 로 접속하면 굵은 글씨가  
localhost:3000/italic 으로 접속하면 기울어진 글씨가 출력되는 것을 확인 할 수 있습니다.  

이번에는 fs 모듈을 이용하여 html 파일을 통째로 response 해봅시다.  
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

fs 모듈의 readFile 함수를 이용하여 '/' 주소로 GET 요청이 들어오면 'index.html'을 찾아 응답으로 넘겨주었습니다.  
res 객체의 writeHead 메소드는 다음과 같이 작성합니다.  
res.writeHead(status code, headers)  
여기에 headers에는 아까 HTTP 통신에서 살펴보았던 response header에 해당합니다.  

이번에는 GET 요청과 POST 요청을 처리해보겠습니다.  

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

위 소스코드를 실행한 다음 localhost:3000에 접속해봅시다.  
이전 예제와 같이 index.html를 fs 모듈을 통해 읽어 웹 브라우저에 response로 보냈습니다.  
localhost:3000 에서
GET 버튼을 누르면 /test의 주소로 GET request가 전송됩니다.  
POST 버튼을 누르면 /test의 주소로 POST request가 전송됩니다.  

다시 localhost:3000으로 돌아온 후  
이번엔 버튼을 클릭하지 않고 주소창에 localhost:3000/test 를 입력해 보겠습니다.  
GET이라고 응답하는것을 보아 일반적으로 주소창에 주소를 입력하여 접속하는 것은 GET 방식임을 확인할 수 있습니다.  

마찬가지로 a 태그의 href 속성도 GET 방식의 요청을 해 줍니다.  

이번에는 request를 받고 다른 주소로 redirection를 해 줘 봅시다.  
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

소스코드를 실행한 다음 localhost:3000에 접속해 봅시다.  

GET 버튼은 이전 예제와 같이 동작하지만, POST 버튼을 누르면 콘솔창에는 "POST /test"가 출력되고  
다시 메인페이지로 돌아온 것을 확인 할 수 있습니다.  

### (4) Assignment
다음 조건에 맞는 app.js 를 작성해 주세요.  

app.js에는 counter라는 변수가 선언되어 있으며 0으로 초기화 되어있습니다.  

localhost:3000는 counterMain.html을 보여줍니다.  

Increase 버튼을 누르면 /increase로 POST request가 발생하고  
서버에서는 변수 counter의 값을 1 증가시킨 다음 localhost:3000으로 redirect 해줍니다.  

Decrease 버튼을 누르면 /decrease로 POST request가 발생하고  
서버에서는 변수 counter의 값을 1 감소시킨 다음 localhost:3000으로 redirect 해줍니다.  

Show 버튼을 누르면 /show로 GET request가 발생하고 counter의 값을 response로 전달해 줍니다.  

강의자료에 html파일은 제공되어 있으며 app.js만 새로 작성해주시면 됩니다.  
