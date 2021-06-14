## 7. Middlewares
이번 강의에서는 **미들웨어**에 대해 알아보도록 하겠습니다.  
본격적으로 시작하기에 앞서 미들웨어가 무엇인지 간략히 설명하고 넘어가겠습니다.  

미들웨어는 단어에서도 유추 가능하듯이 중간에 위치한 소프트웨어입니다.  
어느 곳의 중간이냐면, 요청(**request**)와 응답(**response**)의 중간입니다.  

이번 강의의 예제들은 이전과 같이 강의자료에 제공이 되겠지만,  
많은 파일을 사용하지 않을 예정이기 때문에  
강의와 함께 처음부터 작성해 나가는것을 추천드립니다.  

---

### (1) Middleware basic
npm을 통해서 다양한 미들웨어를 설치하여 이용할수 있습니다.  

하지만 그 전에, 미들웨어가 어떻게 작동되는 지 감을 잡아보도록 하겠습니다.  

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

다른 부분은 이전 express 강의에서 다루었기 때문에 생략하고,  
이번 예제에서 처음 등장한 `app.use`에 대해서만 설명하도록 하겠습니다.  

app.use의 사용법은 다음과 같습니다.  
`app.use(미들웨어)`  

지금은 미들웨어로 콘솔창에 user-agent(=브라우저 정보)를 출력하는 함수를 사용했습니다.  

미들웨어를 사용하는데 주의하실 점은 app.use의 위치입니다.  
app.use는 app.get 혹은 app.post보다 **먼저** 위치해 있어야 하며,  
app.use 사이에도 **쓰인 순서대로** 실행되기 때문에 순서가 중요합니다.  
또한, 사용자 정의 미들웨어인 경우 callback함수의 매개변수가 `req`,`res`,`next` 세개가 존재하며  
미들웨어의 마지막에는 `next();`로 끝내주셔야 다음 미들웨어 혹은 `app.get` / `app.post`가 실행된다는 점을 유의해 주세요.  

---

### (2) Router
**라우터**를 배우기 이전에 라우팅이 무엇인지 짚어보도록 하겠습니다.  
사실 우리는 이미 라우팅을 사용하고 있었습니다.  
라우팅은 클라이언트(=브라우저)에서 요청하는 주소에 따라 다른 처리를 하는 것을 말합니다.  
6강 Express에서 `app.get()`, `app.post()` 함수를 작성하는 것도 라우팅을 한 것이죠.  
Router 미들웨어는 이러한 라우팅을 더욱 편하게 도와줍니다.  
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

const router=require('./router');

app.use((req,res,next)=>{
    console.log(req.headers["user-agent"]);
    next();
});

app.use('/',router);

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

router.js에서는 `const router=express.Router();`로 라우터를 하나 생성한 다음,  
기존 example.js의 `app.get`이 수행했던 동작을 `router.get`으로 변경하여 수행되도록 했습니다.  
마지막엔 `router`를 모듈으로 export했습니다.  

example.js에서는 router.js에서 export했던 모듈을 const router로 가져왔습니다.  
그리고 기존 `app.get`이 존재했던 부분을 `app.use('/',router);`로 '/' 경로에 대해서는 router모듈로 처리하라는 미들웨어를 등록했습니다.  

example.js를 실행시키고 localhost:3000에 접속하면 이전 예제와 똑같은 결과가 나타나는 것을 확인할 수 있습니다.  

이전까지는 localhost:3000/foo 이런식의 라우팅만 구성했습니다.  
만약에 localhost:3000/foo/bar의 요청을 처리하려면 어떻게 해야 할까요??

물론 `app.get('/foo/bar',...)` 혹은 `router.get('/foo/bar',...)`의 방식으로 처리가 가능은 할겁니다.  
만약에 이렇게 라우팅한 상황에서 localhost:3000/foo/baz 라는 주소를 추가로 처리하려면  
`app.get('/foo/baz',...)` 혹은 `router.get('/foo/baz',...)`를 또 작성하여 처리해야할까요??  

물론 아닙니다.  
두가지의 방법이 있습니다.  

첫번째는 **와일드 카드**의 방법입니다.  
프로그래밍을 접하면서 주로 쓰일 와일드 카드는 ? 이나 * 등이 있습니다.  
?의 의미는 아무거나 한 글자를 의미하고, *는 아무거나를 의미합니다.  
즉, 와일드 카드는 아무거나를 말합니다.  
이런 와일드 카드를 라우팅에도 사용할수 있습니다.  

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

wildcard.js를 실행시키고  
localhost:3000/id/(아무문자나숫자)에 접속하면 입력한 문자나 숫자가 출력되는 것을 확인할 수 있습니다.  
app.get의 주소에 **콜론**(:)을 이용해 와일드 카드 number를 등록해 두었습니다.  
그 다음 `req.params`로 주소의 number자리에 입력된 값을 num에 저장한후 res.send해 주었습니다.  

이로써, localhost:3000/id/(아무문자나숫자)에 대한 라우팅은 해결되었습니다.  

두번째는 아까 배운 router 미들웨어를 활용하는 방법입니다.  

예제를 진행하기 앞서 디렉토리 구성은 다음과 같이 되어있습니다.  

foobar.js  
foo/  
\-index.js  
\-bar.js  
\-baz.js  

```javascript
// foobar.js  
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
```
```javascript
// foo/index.js
const express=require('express');
const router=express.Router();

const bar=require('./bar');
const baz=require('./baz');

router.get('/bar',bar.Bar);
router.get('/baz',baz.Baz);

module.exports=router;
```
```javascript
// foo/bar.js
exports.Bar=(req,res)=>{
    res.send("bar");
}
```
```javascript
// foo/baz.js
exports.Baz=(req,res)=>{
    res.send("baz");
}
```

foobar.js에서는 `app.use('/foo',foo)` '/foo' 경로로 들어오는 요청은 foo라는 모듈로 처리되도록 하였습니다.  
하지만 foo는 js 파일이 아닌 디렉토리입니다. 이런 경우에는 index.js가 대신하게 됩니다.  
따라서 `require('./foo')`는 /foo/index.js를 import하게 됩니다.  

index.js는 `router`를 사용하고, 이 라우터를 export합니다.  
또한, 같은 foo 디렉토리안의 bar와 baz를 import합니다.
/bar로 get요청이 들어오면 bar.Bar를 실행하고,  
/baz로 get요청이 들어오면 baz.Baz를 실행한다는 `router.get` 함수를 작성해놓았습니다.  

그러나 여기서 유의하셔야 할것은 이 /foo/index.js에 접근하기 위해서는 우선 example.js에서 '/foo'에 대한 접근이 이루어져야 합니다.  
그 다음에 /foo/index.js에 접근되기 때문에 
/foo/index.js에서 `router.get`의 '/bar', '/baz'는  
실제로는 localhost:3000/foo/bar 와 localhost:3000/foo/baz의 경우에 해당합니다.  

bar.js와 baz.js는 bar에선 bar, baz에서는 baz를 출력합니다.  

와일드카드를 사용하는 방법에 비해 router 미들웨어를 활용하는 방법이 훨씬 어려운것을 알수있습니다.  

두 방법이 사용되는 경우는 상이합니다.  
**와일드카드**는 후술하겠지만 query string이나, request body처럼 클라이언트에서 서버로 데이터를 전송할 때, url(uri)에 데이터를 담아 전송할 때 사용됩니다.  
예를 들자면 특정 게시물을 출력하는 주소가 /board/view일 때 /board/view?boardId=1234로 1234번 게시물의 내용을 보게 할 수도 있고 와일드카드를 이용하여   
/board/view/1234로 라우팅을 설정할 수도 있습니다.  
이처럼 와일드 카드는 게시물의 내용을 반환한다는 큰 틀은 유지한 채 어떤 게시물을 출력하는 정도에 미세조정에 사용됩니다.  

***Router*** 미들웨어는 와일드카드에 비해 융통성은 다소 떨어집니다.  
그러나 API를 구성하는 것 처럼 url(uri)간에 기능이 서로 많이 다르고, 나올 수 있는 url를 미리 파악할 수 있을 때 사용하기 적절합니다.  
소스코드를 분리하고, Router를 적절하게 사용하면 소스코드의 유지보수가 매우 편리해집니다.  

---

### (3) express.static
이번에는 정적인 파일을 제공하는데 도움을 주는 **express.static** 미들웨어에 대해 알아보도록 하겠습니다.  
정적인 파일은 파일을 수정하지 않는 한 일정한 결과를 보여줍니다.  
이미지, .html, .css, .js파일 등이 그에 해당하고  
동적인 파일은 정적인 파일과 반대로 항상 같은 결과를 보여주지는 않습니다.  
다룰 예정은 아니지만 node.js의 view engine인 ejs가 이에 해당합니다.  
(ejs, https://araikuma.tistory.com/454)

`express.static`의 사용법은 다음과 같습니다.  

```javascript
app.use(express.static(__dirname+'static'));
```

`express.static`에 접근 허용하고자 하는 파일의 경로를 입력해 주시면 됩니다.  

예제를 살펴보겠습니다.  
디렉토리 구성은 다음과 같이 되어있습니다.  
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

staticExample.js를 실행시킨 후 localhost:3000/html/index.html에 접속해 봅시다.  
라우팅설정을 하나도 하지 않았지만 index.html페이지가 로드되는 것을 알수있습니다.  
이번에는 localhost:3000/html/staticPage.html에 접속해 봅시다.  
staticPage.html이 로드되는 것을 알수있습니다.  
html파일이 로드됨과 동시에 static 폴더 내부에 있는 css과 image도 같이 성공적으로 로드되는것을 알 수 있습니다.   

특정 경로에서만 `express.static`이 작동하게 할수도 있습니다.
```javascript
app.use('/myhtml',express.static(__dirname+'/static'+'/html'));
```

위 예제 코드를 다음과 같이 수정한다면 localhost:3000/myhtml/index.html이나 localhost:3000/myhtml/staticPage.html로 접근가능합니다.  

이때 express.static에는 /static/html까지만 입력되었으므로 css나 image의 경로는 새로 `express.static` 미들웨어를 이용하여 추가해야 합니다.  

---

### (4) body-parser
이번에는 **body-parser** 미들웨어를 이용하여 클라이언트로부터 데이터를 받고 처리하는 과정을 배워보도록 하겠습니다.  

body-parser 미들웨어는 주로 POST를 통한 데이터를 받을 때 사용됩니다.  
그러면 GET을 이용한 데이터는 어떻게 받을까요?

GET과 POST는 데이터 전송에있어 차이가 있습니다.  
GET방식으로 데이터를 전송하면 주소에 **쿼리스트링**(QueryString)형식으로 데이터가 담아집니다.  
이에 반해 POST 방식으로 데이터를 전송하면 데이터가 **request body**에 담겨 집니다.  
GET 방식에 비해 한층 싸여져 있는 셈이죠.  

쿼리스트링은 다음과 같은 구조를 지닙니다.  

네이버에 경희대학교를 검색한 후 주소를 복사해 오겠습니다.  

https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=경희대학교

search.naver.com/search.naver 이후 ?로 시작하여 =과 &이 반복되는 것을 확인할수있습니다.  

?가 하는 것은 ?이후로는 쿼리스트링이라고 알려주는 것입니다.  
쿼리스트링은 다음과 같은 구조가 반복됩니다.  
key1=value1&key2=value2&key3=value3&....  
위 주소로 다시 돌아가면 쿼리스트링은  
sm은 top_hty라는 값을 가지고, fbm은 1, ie는 utf8, query는 검색어인 경희대학교라는 값을 가진다는 것을 알수있습니다.  

이를 서버단에서 처리하려면 어떻게 할까요??  

예제가 실행될 디렉토리 구성은 다음과 같습니다.  

qsExample.js  
static/  
\-html/  
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

`app.get('/send')` 내부의 `req.query.text`를 통해 이름이 text인 값의 value를 가져왔습니다.  
여기서 key값을 결정하는 것은 qsExample.html파일의 input 태그의 name 속성입니다. 이부분은 POST에서도 쓰이니 꼭 기억해 주세요.  

qsExample.js를 실행시키고 localhost:3000/html/qsExample.html에 접속한 다음 아무 텍스트나 입력하고 확인 버튼을 눌러 봅시다.  

입력한 값이 /send뒤에 쿼리스트링으로 들어가고 콘솔창과 브라우저 화면에 입력한 값이 출력되는 것을 확인할수있습니다.  

이번에는 POST의 경우를 다뤄보겠습니다.  
차이점은 `express.json()`, `express.urlencoded()` 미들웨어를 등록해 주어야 하고  
GET에서는 쿼리스트링으로 데이터가 주어지기 때문에 `req.query`로 가져왔지만,  
POST에서는 body에 담겨 오기 때문에 `req.body`로 접근해주시면 됩니다.  



```javascript 
//bodyparserExample.js
const express=require('express');
const app=express();

app.use(express.static(__dirname+'/static'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/send',(req,res)=>{
    const text=req.body.text;
    console.log('Received text:'+text);
    res.send(text);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});
```

`app.use`에서 json과 urlencoded 방식으로 request body를 받기 위해 미들웨어 `express.json()`과 `express.urlencoded()`를 등록하였고,  
(urlencoded, https://weicomes.tistory.com/10)  
`app.post`를 이용하여 라우팅하였습니다.  
이전 예제와 다르게 데이터에 `req.body`로 접근했음을 유의해주세요.  

localhost:3000/html/index.html에 접속하고 텍스트를 입력한 다음 확인을 누르면 이전 예제와 마찬가지로 입력한 문자가 브라우저와 콘솔창에 출력이 됩니다.  

---

### (5) Assignment
회원가입을 하는 signup.html 페이지와 로그인을 하는 login.html 페이지가 강의 자료에 있습니다.  
fs 모듈을 사용하셔도 무방하고 express.static 미들웨어를 사용하셔도 상관은 없습니다.  
다음 기능을 하는 app.js를 만들어 주세요.  

1. localhost:3000에 접속하면 바로 회원가입 페이지로 redirect 된다.  
2. 회원 가입은 아이디(userId)와 비밀번호(password)로만 필요로 한다.  
3. 회원 가입 창에서 아이디와 비밀번호를 입력하고 회원 가입 버튼을 누르면 '/signup'의 주소로 데이터가 담긴 채 POST 요청이 간다.  
4. 서버에는 users라는 json array를 가지고 있다. 회원 가입 시 전송된 아이디와 비밀번호중 아이디가 users에 이미 존재하는지 확인한다.  
5. 존재하면 `res.send('User already exists');`를 실행하고 존재하지 않으면 users에 새로운 JSON을 추가하고 로그인 페이지로 redirect 시킨다.  
6. 로그인창은 마찬가지로 아이디와 비밀번호를 받는다.  로그인 버튼을 누르면 '/login'의 주소로 POST 요청이 간다.  
7. 서버는 users 배열에서 해당 아이디가 있는지 확인하고 만약 없다면 `res.send('ID wrong');`을 실행하고 아이디가 있지만 비밀번호가 일치하지 않으면 `res.send('Password wrong');`을 실행하고 아이디와 비밀번호가 모두 올바르면 `res.send("Welcome "+userId+"!");`를 실행하여 환영문구를 작성한다.  
