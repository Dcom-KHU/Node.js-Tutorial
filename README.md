# 2019-Node.js-Study
1. [Introduction](#introduction)
1. Functions
1. Promise, async/await
1. Modules
1. Express
1. Router
1. Cookies & Session 


## 1. Introduction <a id="introduction"></a>  
### (1) Node.js 란?
Node.js는 구글의 V8 엔진을 인터프리터로 사용하는 런타임입니다.

웹 프론트엔드에서만 사용되던 JavaScript를 브라우저 외의 다른 환경에서도 사용할 수 있게 된 것입니다.

#### Node.js의 장단점
장점이라 할 수 있는 점은 크게 세가지가 있습니다.  
첫번째로는 Javascript를 기반으로 하고 있기 때문에, 웹 프론트엔드에서 Javascript를 다뤄 보았다면 쉽게 익힐 수 있습니다.  

두번째로는 상당량의 모듈을 갖고 있기 때문에, 개발자가 이용하고자 하는 대부분의 모듈을 쉽게 구할 수 있습니다.
<img src="https://github.com/JJuOn/2019-Node.js-Study/blob/master/img/1.PNG?raw=true">  
위 이미지는 2019년 7월 기준, www.modulecounts.com 에서 모듈의 개수를 비교한 그래프입니다.  
Node.js에 해당하는 npm(node.js package manager)가 압도적 차이로 1위를 한것을 알 수 있습니다.  

세번째로는 비동기(Asynchronous)입니다.  
프로그램이 순차적으로 시작되는 것이 아닌 이벤트 기반으로 실행되기 때문에 매우 빠르고 효율적으로 작동합니다.

다음엔 단점을 살펴보겠습니다.  
첫번째로는 비동기(Asynchronous)입니다.
장점에서 언급되었던 그 비동기와 같습니다.  
순차적 프로그래밍 언어(Python, C, C++, Java 등)에 익숙한 우리에게 비동기는 초반에 큰 혼란을 줍니다.
```javascript
const file="example.txt";
const fs=require('fs');
fs.readFile(file,(err,data)=>{
    if (err){
        throw err;
    }
    let len=data.toString().split("\n").length-1; 
    console.log("File Length: "+len); //1
});
console.log("Exit"); //2
```
위 소스코드는 파일을 읽고 출력하는 부분과, "Exit"라고 출력하는 부분으로 나누어져있습니다.  
오늘은 처음이시기 때문에 소스코드 전체를 이해하려 하지 않으셔도 됩니다.  
1번과 2번의 console.log()는 콘솔창에 출력하는 함수입니다.  
1번과 2번 중 어느것이 먼저 실행될것이라 생각하시나요?  
1번이라 대답하셨다면 순차적 프로그래밍에 이미 익숙해지신 것입니다.  
정답은 2번이 출력된 후, 1번이 출력됩니다.  

처음 접하신 분이라면 큰 혼란을 느끼셨을 것입니다.  
실제로 Node.js를 배우면서 많은 어려움을 느끼는 것이 이 부분입니다.  

두번째로, 위 소스코드에서 파일 3개를 순차적으로 읽어야 한다면 어떻게 될까요?  
```javascript
const file1="1.txt";
const file2="2.txt";
const file3="3.txt";
const fs=require('fs');
fs.readFile(file1,(err,data1)=>{
    fs.readFIle(file2,(err,data2)=>{
        fs.readFile(file3,(err,data3)=>{
            let len1=data1.toString().split("\n").length-1;
            let len2=data2.toString().split("\n").length-1; 
            let len3=data3.toString().split("\n").length-1;
            console.log('File lengths:,len1,len2,len3');
        });
    });
});
```
대충 이런 식으로 됩니다.  
소스코드가 복잡해진 것을 느낄수 있습니다.  
지금은 3개이지만, 만약 이런 과정이 더 반복된다면 소스코드는 더욱 복잡해 질것입니다.  
복잡해진 소스코드는 에러가 자주 발생할 뿐만 아니라, 발생한 에러도 찾기 힘들어 질 것입니다.  
또한 소스코드를 수정하다가 중괄호{}나 소괄호()를 빼먹는다면?  
프로그래밍을 하려 했는데 괄호 짝 맞추기나 하고 있는 여러분을 찾을 수 있을것입니다.  
이런 상황을 Callback Hell이라고 합니다. fs.readFile() 뒷부분의 (err,data)에 해당하는 call back 함수의 지옥에 갇혀버린 것이죠.  

다행히 Node.js를 사용하는 많은 개발자들도 이러한 불편함을 알고 있기에 이를 해결할 다양한 방법이 존재합니다.  
이런 방법들은 추후에 다룰 예정입니다.  

### (2) 개발환경 구축하기 - Node.js 설치
이번에는 Node.js를 설치해보도록 하겠습니다.  
www.nodejs.org  
Node.js 공식사이트입니다.  
들어가자 마자 보면 다운로드부터 하라고 하네요.  
LTS 버전과, Current 버전이 있습니다.  
LTS 버전은 안정된 버전이라고 보시면 되고, Current 버전은 최신 버전이라고 생각하시면 됩니다.  
LTS 버전을 선택해 설치해주시면 됩니다.  

설치가 완료되었다면 cmd창에서  
```bash
node -v
```
를 입력했을 때, 설치한 Node.js의 버전이 출력된다면 성공적으로 설치가 된것입니다.

### (3) 개발환경 구축하기 - IDE 설치
IDE란 통합 개발 환경(Integrated Development Environment)으로 코딩, 디버그, 컴파일, 배포 등 프로그램 개발에 관련된 모든 작업을 하나의 프로그램 안에서 처리하는 환경을 제공하는 소프트웨어입니다.  
Node.js 개발자들이 주로 사용하는 IDE에서는 Visual Studio Code와 Webstorm, Atom 등이 있습니다.  
저는 이전에 Pycharm을 사용하였기에 Webstorm을 주로 사용하지만, Visual Studio Code도 매우 많은 사람들이 이용하는 IDE입니다.  
본 강의는 Webstorm과 Visual Studio Code를 기반으로 작성되었습니다.  

#### Webstrom 설치하기
Jetbrains 사의 Webstorm은 자사의 pycharm(python), intellij IDEA(java)와 다르게 유료입니다.  
하지만 우린 학생이기 때문에 학생 라이센스를 통해 교육용으로 사용할 수 있습니다.  
다음 링크에 나와있는 방법을 통해 라이센스를 받아봅시다.  
https://tworab.tistory.com/47  

학생용 라이센스를 얻었다면, 이번에는 Webstorm을 설치해 줍시다.  
https://copycoding.tistory.com/73 

위 링크에서 설치중, License Activation에서 우린 학생 라이센스를 획득 했기 때문에 Evaluate for free가 아닌 Activate를 체크하고 아까 라이센스를 획득한 jetbrains 이메일과 비밀번호를 입력해주시면 됩니다.

#### Visual Studio Code 설치하기

https://league-cat.tistory.com/7

위 링크를 따라 설치하시면 됩니다.

### (3) Hello Node.js 출력하기
Webstorm 혹은 VS Code를 실행해 줍시다.
파일명이 hello인 javascript 파일(.js)을 생성해 줍시다.  
다음과 같은 소스코드를 입력해 봅시다.  
```javascript
console.log("Hello Node.js!");
```
webstorm의 경우 Alt+Shift+F10을 누르면 실행이 되고,  
vscode의 경우 Ctrl+F5를 누르면 실행이 됩니다.  
콘솔창에 Hello Node.js! 가 출력이 된 것을 확인 할 수 있습니다.  

### (4) Assignment
자신의 이름을 콘솔창에 출력하는 프로그램 hello.js를 작성하여 자신의 github repository에 제줄해 주세요.  
출력예시:  
```
Hello 주원!
```
