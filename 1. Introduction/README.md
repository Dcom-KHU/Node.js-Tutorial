## 1. Introduction 
### (1) Node.js 란?
Node.js는 구글의 V8 엔진을 인터프리터로 사용하는 런타임입니다.

웹 프론트엔드에서만 사용되던 JavaScript를 브라우저 외의 다른 환경에서도 사용할 수 있게 한 것입니다.

#### Node.js의 장단점
Node.js **장점**은 세 가지가 있습니다.  
1. Javascript를 기반으로 하기 때문에, Javascript를 다뤄 보았다면 쉽게 익힐 수 있습니다.  

2. Node.js는 수 많은 모듈을 갖고 있습니다. 따라서 개발자가 이용하고자 하는 대부분의 모듈을 쉽게 구할 수 있습니다.
<img src="https://github.com/JJuOn/Node.js-Tutorial/blob/master/img/1.PNG?raw=true">    
위 이미지는 2019년 7월 기준, www.modulecounts.com 에서 모듈의 개수를 비교한 그래프입니다.  
Node.js에 해당하는 npm(node.js package manager)가 압도적 차이로 1위 임을 알 수 있습니다.  

3. Node.js는 비동기(Asynchronous)입니다.  
프로그램이 순차적으로 시작되는 것이 아닌 이벤트 기반으로 실행되기 때문에 매우 빠르고 효율적으로 작동합니다.  


다음엔 **단점**을 살펴보겠습니다.  
첫번째 단점은 Node.js 비동기(Asynchronous)로 작동한다는 것입니다.  
장점에서 언급되었던 그 비동기와 같습니다.  
순차적 프로그래밍 언어(Python, C, C++, Java 등)에 익숙한 우리에게 비동기는 초반에 큰 혼란을 줍니다.  
```javascript
const filename="example.txt";
const fs=require('fs');
fs.readFile(filename,(err,data)=>{
    if (err){
        throw err;
    }
    let len=data.toString().split("\n").length-1; 
    console.log("File Length: "+len); //1
});
console.log("Exit"); //2
```

위의 소스코드를 한번 살펴봅시다.
오늘은 첫 시간이라 소스코드 전체를 이해하려 하지 않으셔도 좋습니다.  
위 소스코드는 파일을 읽고 출력하는 부분(*1번*)과, "Exit"라고 출력하는 부분(*2번*)으로 나누어져있습니다.  

*1번*과 *2번*의 console.log()는 콘솔창에 출력하는 함수입니다.  
*1번*과 *2번* 중 어느것이 먼저 실행될 것이라 생각하시나요?  
*1번*이라 대답하셨다면 순차적 프로그래밍에 이미 익숙해지신 것입니다.  
정답은 *2번*이 출력된 후, *1번*이 출력됩니다.  
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
callback을 자주 사용하는 Node.js 특성상 소스코드가 복잡해진 것을 느낄 수 있습니다.  
지금은 3개이지만, 만약 이런 과정이 더 많아진다면 소스코드는 더욱 복잡해 질 것입니다.  
복잡한 소스코드는 에러가 자주 발생할 뿐만 아니라, 발생한 에러도 찾기 힘들어집니다.  
또한 소스코드를 수정하다가 중괄호{}나 소괄호()를 빼먹는다면?  
프로그래밍을 하려 했는데 괄호 짝 맞추기나 하고 있는 여러분을 찾을 수 있을 것입니다.  
이런 상황을 **Callback Hell**이라고 합니다. fs.readFile() 뒷부분의 (err,data)에 해당하는 call back 함수의 지옥에 갇혀버린 것이죠.  

다행히 Node.js를 사용하는 많은 개발자들도 이러한 불편함을 알고 있기에 이를 해결할 다양한 방법들이 제시되었습니다.
이런 방법들은 추후에 다룰 예정입니다.  

---

### (2) 개발환경 구축하기 - Node.js 설치
이번 챕터에서는 Node.js를 설치하겠습니다.  
www.nodejs.org  
Node.js 공식사이트입니다.  
들어가자 마자 보면 다운로드부터 하라고 합니다.  
LTS (Long Term Support) 버전과, Current 버전이 있습니다.  
LTS 버전은 안정된 버전이라고 보시면 되고, Current 버전은 최신 버전이라고 생각하시면 됩니다.  
LTS 버전을 선택해 설치해주시면 됩니다.  

설치가 완료되었다면 CMD 창에서 아래 명령어를 입력해 주세요. 
```bash
node -v
```
설치한 Node.js의 버전이 출력된다면 성공적으로 설치하신 겁니다.

---

### (3) 개발환경 구축하기 - IDE 설치
IDE란 **통합 개발 환경(Integrated Development Environment)** 으로 코딩, 디버그, 컴파일, 배포 등 프로그램 개발에 관련된 모든 작업을 하나의 프로그램 안에서 처리하는 환경을 제공하는 소프트웨어입니다. 예를 들어 C++를 개발할 때 주로 사용하는 Visual Studio, Java를 개발할 때 사용하는 Eclipse 등이 있습니다.  
Node.js 개발자들이 주로 사용하는 IDE에서는 Visual Studio Code와 Webstorm, Atom 등이 있습니다.  
본 강의는 Visual Studio Code를 기반으로 작성되었습니다.  

사실, Visual Studio Code는 IDE라고 부르기에는 적합하지 않습니다.  
IDE들은 위에 언급된 기능들을 모두 갖춘 소프트웨어를 의미하지만,  
VSCode 그 자체로는 메모장보다 좀 더 좋은 텍스트 편집기에 불과합니다.  

그럼에도 불구하고 VSCode를 사용하는 이유는 확장 프로그램을 설치하여 기존 IDE(Webstorm 등)이 할 수 있는 것보다 더 많은 기능을 가질 수 있기 때문입니다.  

또한 Webstorm보다 매우 가볍습니다.  

#### Visual Studio Code 설치하기

https://league-cat.tistory.com/7

위 링크를 따라 설치하시면 됩니다.

---

### (4) Hello Node.js 출력하기
VS Code를 실행해 줍시다.
파일명이 hello인 javascript 파일(.js)을 생성해 줍시다.  
다음과 같은 소스코드를 입력해 봅시다.  
```javascript
//1-1 hello.js
console.log("Hello Node.js!");
```
vscode에서는 `Ctrl+F5`를 누르면 실행이 됩니다.  
콘솔창에 Hello Node.js! 가 출력이 된 것을 확인 할 수 있습니다.  

---

### (5) Assignment
자신의 이름을 콘솔창에 출력하는 프로그램 hello.js를 작성하여 자신의 github repository에 제출해 주세요.  
출력예시:  
```
Hello 주원!
```