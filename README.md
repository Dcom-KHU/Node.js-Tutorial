# 2019-Node.js-Study
1. [Introduction](#introduction)
1. [Functions](#functions)
1. [Promise, async/await](#promise)
1. [Modules](#modules)
1. [Express](#express)
1. Middlewares
1. Cookies & Session 

<a id="introduction"></a>  
## 1. Introduction 
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
자신의 이름을 콘솔창에 출력하는 프로그램 hello.js를 작성하여 자신의 github repository에 제출해 주세요.  
출력예시:  
```
Hello 주원!
```
<a id="functions"></a>  
## 2. Functions
이번 장에서는 함수에 대해서 다룰 예정입니다.  

### (1) Arrow Function
두 수의 합을 출력하는 sum이라는 함수가 있습니다.  
전통적인 javascript에서는 함수를 다음과 같이 두가지 방법으로 작성하고 사용했습니다.  
```javascript
// 함수 선언식(function declaration)
function sum(a,b){
    return a+b;
}

// 함수 표현식(function expression)
const sum2=function(a,b){
    return a+b;
}
console.log(sum(11,22)); // 33
console.log(sum2(11,22)); // 33
```
일반화 하자면 다음과 같습니다.  
함수 선언식은  
function 함수이름(매개변수1, 매개변수2, ...){  
    내용;  
}  
함수 표현식은  
const 함수이름=function(매개변수1, 매개변수2, ...){  
    내용;  
}  

2015년에 발표된 자바스크립트 버전인 ES2015(=ES6)에는 Arrow Function이란 새로운 함수 표기법이 포함되었습니다.  

바로 예시를 들어 설명하겠습니다.  
```javascript
function sum(a,b){
    return a+b;
}

const sum2=function(a,b){
    return a+b;
}

const sum_arrow=(a,b)=>a+b;

const sum_arrow2=(a,b)=>{
    const result=a+b;
    return result;
}
```

위의 sum_arrow()는 sum()와 sum2()을 그대로 arrow function으로 표현한 것입니다.  
sum_arrow()가 sum()나 sum2()에비해 눈에 띄게 간단하게 표현된 것을 확인할 수 있습니다.  
sum_arrow2()는 함수안에서 여러줄의 코드가 실행되는 경우 중괄호{}를 이용하여 표현했습니다.  
함수의 매개변수가 없는 경우나 매개변수가 하나인 경우는 다음과 같이 표현할 수 있습니다.  
```javascript
const no_param=()=>console.log('no parameter');

const one_param=(a)=>console.log('one parameter :',a);

const one_param2=a=>console.log('one parameter :',a);
```

no_params()는 매개변수가 없는 함수이고 빈 소괄호 ()를 이용하여 표현하였습니다.  
one_param()은 기존 arrow function과 비슷하게 소괄호 안에 하나의 매개변수를 입력하여 작성하였습니다.  
매개변수가 하나인 경우는 소괄호를 생략한 채, one_params2()처럼 매개변수 하나만 달랑 입력하여 작성할 수도 있습니다.  

### (2) Callback Function
이번에는 callback function에 대해 알아보도록 하겠습니다.  
그 전에 javascript에서 함수의 성질에 대해 먼저 짚어보겠습니다.  
javascript에서의 함수는 일급 객체로, 변수에 대입하거나 함수에 매개변수로 전달할 수 있습니다.

```javascript
const plus=(a,b)=>a+b;

const minus=(a,b)=>a-b;

let p=plus;

console.log(typeof(p)); // function

console.log(plus(11,22)); // 33
console.log(p(11,22)); // 33

const calculate=(a,b,func)=>func(a,b);

console.log(calculate(11,22,plus)); // 33
console.log(calculate(11,22,minus)); // -11
```

위 코드를 살펴보면  
두 수의 합을 반환하는 plus()와 두 수의 차를 반환하는 minus()를 선언했습니다.  
그 다음 변수 p에 함수인 plus를 소괄호 없이 대입하였습니다.  
typeof()로 p의 type을 출력해보면 function이 출력되는 것을 보아, 함수를 변수에 대입하는 것이 가능하다는 것을 알수있습니다.  

p에 plus를 대입했기에, plus(11,22)와 p(11,22)는 같은 값을 갖게 됩니다.  

이번에는 함수의 매개변수에 함수를 전달하겠습니다.  
calculate의 매개변수인 func자리에는 함수가 들어가게됩니다.  
매개변수로 plus를 전달하면 두 수 a, b의 합이 출력되고, minus를 전달하면 두 수 a, b의 차가 출력됩니다.  

이제 callback function에 대해 알아보겠습니다.  
callback의 사전적 정의는 '답신 전화', '회신'이라는 뜻입니다.  

callback function은 특정 함수에 매개변수로 전달된 함수를 말하며, 특정 함수가 실행될 때 호출되는 방식으로 작동합니다.  

```javascript
const sum=(a,b)=>a+b;

const printResult=(result)=>{
    console.log("결과는",result,"입니다.");
};

const calculateAndPrint=(calculationResult, callback)=>{
    callback(calculationResult);
};

calculateAndPrint(sum(10,20),printResult); // 결과는 30 입니다.
```

위 코드의 마지막줄에서 calculateAndPrint의 인자로 sum(10,20)과 함수인 printReuslt를 넘겨 주었습니다.  

sum(10,20)의 값은 30이기 때문에, 
calculateAndPrint의 첫번째 인자는 30입니다. 
callback에 printResult을 넘겨주었기 때문에,  
printResult(30)에서 "결과는 30 입니다."가 출력됩니다.  

### (3) Functional Programming
이 절에서는 함수형 프로그래밍에 대해 알아보겠습니다.  
흔히 프로그래머에게 프로그래밍의 관점을 갖게하고 결정하는 역할을 하는 프로그래밍 패러다임에는 크게 두가지 방법이 있습니다.  
- 명령형 프로그래밍: 프로그래밍의 상태와 상태를 변경시키는 구문의 관점에서 연산을 설명하는 방식
    - 절차지향 프로그래밍: 수행되어야 할 연속적인 계산과정을 포함하는 방식 (C,C++)
    - 객체지향 프로그래밍: 객체들의 집합으로 프로그램의 상호작용을 표현 (C++, Java, C#)
- 선언형 프로그래밍: 어떤 방법으로 해야 하는지를 나타내기 보다 무엇과 같은지 설명하는 방식
    - 함수형 프로그래밍: 순수 함수를 조합하고 소프트웨어를 만드는 방식
    
바로 예시를 들어 설명하겠습니다.
```javascript
// 명령형 프로그래밍
const double=(arr)=>{
    let results=[];
    for(let i=0;i<arr.length;i++){
        results.push(arr[i]*2);
    }
    return results;
}
// 함수형 프로그래밍
const double=(arr)=>{
    return arr.map((item)=>item*2);
}
```

명령형 프로그래밍에서는 for 문을 이용하여 각 배열의 원소를 2배하여 새로운 배열을 반환했지만,  
함수형 프로그래밍에서는 map()이라는 함수를 이용하여 반환했습니다.  

Node.js에서 병렬처리나 비동기 처리를 할때는 함수형 프로그래밍이 적합합니다.  

#### 1) Closer

내부함수가 참조하는(사용하는) 외부함수의 지역변수가 외부함수가 리턴된 이후에도 유효성이 유지될 때, 이 내부함수를 클로저라고 합니다.  
클로저는
- 자신의 코드 블록 내에 정의된 변수
- 외부 함수의 내부에 정의된 변수에 대한 접근
- 전역변수에 대한 접근
로 총 3가지의 스코프 체인을 가진다고 할 수 있습니다.  

```javascript
const grandParent=(g1,g2)=>{
    const g3=3;
    return parent=(p1,p2)=>{
        const p3=33;
        return child=(c1,c2)=>{
            const c3=333;
            return g1+g2+g3+p1+p2+p3+c1+c2+c3;
        }
    }
}

const parentFunction=grandParent(1,2); // parentFunction은 g1,g2,g3에도 접근 가능
const childFunction=parentFunction(11,22); // childFunction은 g1,g2,g3,p1,p2,p3에도 접근 가능
console.log(childFunction(111,222)); // 738
```

가장 첫번째 줄에 grandParent 함수 안에 2개의 함수가 더 정의되어 있으며 각 함수를 실행할때 순차적으로 리턴합니다.  
grandParent 함수에는 내부 변수 g3와 parent 함수를 리턴합니다.  
parent 함수는 내부 변수 p3를 갖고 있으며, child 함수를 리턴합니다.  
child함수는 내부 변수 c3를 갖고 있으며 자신의 외부 함수인 grandParent와 parent의 매개변수와 내부 변수, 자신의 매개 변수와 내부 변수의 총 합을 리턴합니다.  

이때, child는 클로저이며, 외부함수의 파라미터와 변수에 접근이 가능하므로, 전부 접근이 가능하기에 호출될 때 정상적으로 그 값을 산출할 수 있습니다.  

parentFunction에 grandParent 함수를 초기화하여 해당 함수 종료 시 내부에 정의된 parent 함수를 리턴하도록 하였습니다. 또한, parentFunction의 결과 리턴된 child 함수를 childFunction에 초기화 시켰습니다.  

#### 2) Curring
여러개의 매개변수를 갖는 함수가 있을 때 그 중 일부의 파라미터만 필요로하는 함수를 만드는 기법을 커링이라고 합니다.

```javascript
const add=x=>y=>x+y;
const add10=add(10);

console.log(add10(20)); // 30
console.log(add(10)(20)); // 30
```
커링은 화살표 개수보다 적은 인자 개수가 들어오면 add10 처럼 함수를 반환합니다.

따라서 add10 함수는
```javascript
const add10=y=>10+y;
```
와 같습니다.  

#### 3) Filter

배열에서 특정 조건을 가진 데이터 또는 object를 추출하고 싶다면, filter를 사용하는 것이 좋습니다.

```javascript
const ages=[11,12,13,16,21,31];

const upper16=ages.filter(age=>age>16); // [21, 31]
const under13=ages.filter(age=>age<13); // [11, 12]
const between12And21=ages.filter(age=>age>12 && age <21); // [13, 16]
```
filter의 매개변수로 들어간 함수는 배열의 각각의 item에 접근합니다.  
이때, age가 배열의 각 item에 해당합니다.  
뒤에 따르는 조건이 true인 경우에만 push합니다.

#### 4) Map

map 함수는 배열의 각각의 item에 대하여 매개변수로 들어간 함수를 적용시켜 배열을 리턴합니다.  

```javascript
const list = [1,2,3];
const squaredList=list.map(item=>item*item); // [1, 4, 9];
```
map에 매개변수로 item의 제곱을 계산하는 함수를 전달하였습니다.  

#### 5) Reduce

reduce 함수는 배열의 가장 첫번째 item부터 마지막 item까지 매개변수로 들어간 함수를 누적 적용시킵니다.

```javascript
const scores=[10,20,30,40,50];

const sum=scores.reduce((a,b)=>(a+b));
const sumWithInitValue=scores.reduce((a,b)=>(a+b),10);
```
sum 함수에서  
(10, 20)  
((10+20), 30)  
((10+20+30), 40)
...  
와 같이 반복하여 함수가 실행됩니다.  

sumWithInitValue 함수는 초기값으로 10을 함수 인자로 넘겨주었습니다.  
따라서  
(10, 10)  
((10+10), 20)  
...  
와 같이 실행됩니다.  
### (4) Assignment
다음의 2. Functions/callbackExample.js를 arrow function 형태로 바꾸어 봅시다.  
또한 for문에 해당하는 부분을 오늘 배운 함수를 이용하여 변경해 봅시다.  
```javascript
const list=[1,2,3,4,5,6,7,8,9,10];

function callbackExample(items,callback){
    setTimeout(function(){
        let sum=0;
        for(let i=0;i<items.length;i++){
            sum+=items[i];
        }
        callback(sum);
    },0);
};
callbackExample(list,function(result){
    console.log(result);
});
console.log('first');
```
제출은 자신의 github repository에 callbackExample.js로 제출하시면 됩니다.  
강의 자료 repository 참고.  

<a id="promise"></a>
## 3. Promise, async/await
### (1) Promise
비동기 처리는 자원을 효율적으로 사용하고 속도를 높이는 방법으로 많이 사용합니다.  
비동기로 실행할 때는 callback 함수를 매우 많이 사용하는데,  
이는 앞서 1.Introduction에서 언급한 바와 같이 callback hell에 갇혀 코드의 가독성이 떨어지고 실수할 여지가 많습니다.  
이를 해결하기 위한 것이 Promise입니다.  

```javascript
const promiseResult=new Promise((resolve)=>{
    resolve(1);
}).then((result)=>{
    console.log('first: ',result);
    return result+'hello';
}).then((result)=>{
    console.log('second',result);
    return result+'nello';
});

promiseResult
    .then(result=>console.log(result));

// first: 1
// second: 1hello
// 1hellonello
```
resolve는 이전 함수에서 return과 같습니다.  
처음에 resolve(1)을 하면, 1이 .then()으로 이어 실행되는 함수의 인자로 들어갑니다.  
그렇기에 first: 1이 출력됩니다.  

Promise는 또 다른 Promise 객체를 반환하기 때문에 마지막에 연산한 값을 .then(result=>console.log(result));로 출력해주었습니다.  

여러개의 Promise 객체를 따로 선언한 후, 한번에 후처리 할수도 있습니다.  

```javascript
const promiseFirst=new Promise((resolve,reject)=>{
    resolve(1);
}).then(result=>result+10);

const promiseSecond=new Promise((resolve,reject)=>{
    resolve(2);
}).then(result=>result+20);

Promise.all([promiseFirst, promiseSecond]).then((result)=>{
    console.log('result:', result); // result: [11,22]
    console.log('sum: ', result[0] + result[1]); // sum: 33
});
```

promiseFirst는 resolve(1)을 넣고 10을 더했고, promiseSecond는 resolve(2)를 넣고 20을 더했습니다.  
이 두 Promise를 Promise.all()을 이용해 처리했습니다.  
이때 return값은 배열이기 때문에 sum을 구하는 과정에서 result\[0\]과 result\[1\]을 이용해 접근했습니다.  

### (2) Async/await
async/await은 callback hell을 탈출하고자 생긴 Promise마저도 장황하게 느껴 ES2017(=ES8)버전에서 탄생했습니다.  
소스코드와 함께 설명 드리겠습니다.  
```javascript
const promiseAdd10=(num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num+10);
    });
}

const promiseSubtract10=(num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num-10);
    });
}
```
위 코드는 함수의 매개변수로 주어진 값에 10을 더해서 Promise 객체를 리턴하는 함수 promiseAdd10와, 매개변수로 주어진 값에 10을 빼서 Promise 객체를 리턴하는 함수 promiseSubtract10을 구현해 놓았습니다.  
두 함수를 순서대로 실행하고자 하면 다음과 같은 코드가 나옵니다.  
```javascript
const promiseAdd10=(num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num+10);
    });
}

const promiseSubtract10=(num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num-10);
    });
}

promiseAdd10(90)
    .then(promiseSubtract10)
    .then((result)=>{
        console.log("결과는",result,"입니다."); // 결과는 90 입니다.
    });
```

callback 형태에 비해서는 가독성이 많이 향상되었지만 코드가 길어진다면 여전히 보기 어려워지는 것은 마찬가지입니다.  
이를 더욱 보기좋게 만들어 보겠습니다.  
```javascript
const promiseAdd10=(num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num+10);
    });
}

const promiseSubtract10=(num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num-10);
    });
}

const calculate=async ()=>{
    try{
        let sum=await promiseAdd10(90);
        let result=await promiseSubtract10(sum);
        console.log("결과는",result,"입니다."); 
    }
    catch (err){
        console.error(err);
    }
}

calculate(); // 결과는 90 입니다.
```
실질적으로 계산을 하는 calculate 함수를 정의하였습니다.  
여태 다뤄 본 함수들과는 차이가 있음을 확인할 수 있습니다.  
바로 함수의 매개변수 앞에 async라는 단어가 붙은것과, try,catch 문이 추가 되었고,  
함수를 실행하기 앞서 await이라는 단어가 붙었습니다.  

await은 Promise의 resolve를 일반 함수의 return처럼 취급하여,  callback이나 then으로 이어지는 복잡한 코드를  
동기(Synchronous) 형태로 만들어 주는 역할을 합니다.  

단 여기서 주의할 점은 await은 무조건 async 함수 안에서 사용되어야 합니다.  
또한, await 뒤에 실행할 함수는 Promise 객체를 반환하여야 합니다.  
다음은 async 함수를 표현하는 여러가지 예시입니다.  

```javascript
const functionExpression=async function(){
    console.log("함수 표현식");
}
const arrowFunction = async () =>{
    console.log("화살표 함수");
}
const ITFE=(async ()=>{
    console.log("즉시 실행 함수 표현식");
})();
```
만약 await 뒤의 함수의 실행중에 오류가 발생하면 어떻게 될까요?  
아무 일도 일어나지 않습니다.  
디버깅 과정에서 에러가 어느 곳에서 발생했는 지 파악하는 것은 매우 중요합니다.  
이를 도와주는 것이 try catch문입니다.  
try 문 안에서 발생한 오류는 catch 문의 인자 err 로 들어가게 됩니다.  

### (3) Assignment

다음은 3. Promise/address.js의 일부분입니다.  

```javascript
let address="";

const country=(addr)=>{
    addr+="대한민국 ";
    const province=(addr)=>{
        addr+="경기도 ";
        const city=(addr)=>{
            addr+="용인시 ";
            console.log("original : "+addr);
        }
        return city(addr);
    }
    return province(addr);
}

country(address) // original : 대한민국 경기도 용인시
```

위 코드를 참고하여 기존 코드를 Promise 형태로 정의 후 호출하고, Promise들을 async/await 방식으로 호출해 봅니다.

출력 예시는 다음과 같습니다.  
```bash
original : 대한민국 경기도 용인시
promise : 대한민국 경기도 용인시
async/await : 대한민국 경기도 용인시
```

제출은 이전과 마찬가지로 각자의 repository에 해주시면 됩니다.
<a id="modules"></a>
## 4. Modules
이번 강의는 모듈에 대해 진행하도록 하겠습니다.  

모듈은 하나의 독립적인 소프트웨어입니다.  
모듈을 사용하게 되면 소스코드의 길이가 줄어들어 가독성이 향상되고  
기능별로, 함수별로 분리하여 작성하기 때문에 유지 및 보수가 편리합니다.  

다른 언어에서의 경험에 빗대자면  

C++을 해보신 분이라면 #include 를 통해 사용자 정의 헤더 파일이나 내부 라이브러리를 가져와 사용할 수 있었습니다.    
ex) 
``` c++
#include <iostream>
```
혹은 Python를 사용하셨다면 import나 from ... import ...를 통해 다를 모듈을 가져와 사용할 수 있었습니다.  
ex) 
```python
from math import *  
```
Node.js에서는 module.exports랑 require를 이용해서 모듈을 생성하고 가져와 사용할 수 있습니다.

### (1) module.exports / require

```javascript
//add.js
const add=(a,b)=>a+b;

module.exports=add;
```
두 수의 합을 리턴해주는 add 함수를 정의하였습니다.  

맨 마지막 줄 module.exports=add;를 통해 다른 파일에서 add 함수를 사용할 수 있게 하였습니다.  
이 함수를 다른 파일에서 사용하는 방법은 다음과 같습니다.  

```javascript
//app.js
const add=require('./add');

console.log(add(1,2)); // 3
```

위 소스코드 처럼 require의 괄호 속에 사용하고자 하는 모듈의 경로를 입력해 주면 module.exports= 에 입력된 함수를 사용할 수 있게 됩니다.  
add.js 에서 module.exports=add 로 add 함수를 export 해주었기 때문에  
app.js의 require('./add')는 add.js의 add 함수를 의미하게 됩니다.  

그렇다면 module.exports는 하나의 함수만 가능할까요?  
다음 소스코드를 같이 보도록 하겠습니다.  
```javascript
//calc.js
const add=(a,b)=>a+b;
const subtract=(a,b)=>a-b;
const multiply=(a,b)=>a*b;
const divide=(a,b)=>a/b;

module.exports={
    add:add,
    subtract:subtract,
    multiply:multiply,
    divide:divide
}
```

module.exports에 JSON으로 함수들을 export 해주었습니다.  
(JSON이란? https://ko.wikipedia.org/wiki/JSON)

그럼 이 모듈은 어떻게 사용할까요?

```javascript
//calcApp.js
const calc=require('./calc');
const add=calc.add;
const subtract=calc.subtract;
const multiply=calc.multiply;
const divide=calc.divide;

console.log(add(4,2)); // 6
console.log(subtract(4,2)); // 2
console.log(multiply(4,2)); // 8
console.log(divide(4,2)); // 2
```

첫번째 경우와 비슷합니다.  
차이점은 우선 모듈 전체를 가져오기 위한 require('./calc') 부분과  
해당 모듈의 함수를 가져오기 위한 calc.add; calc.subtract; ... 부분으로 나뉘어져 있습니다.  

module.exports할때 사용했던 key들을 사용해 주시면 됩니다.  

모듈을 export하는데는 또 다른 방법이 있습니다.  
```javascript
//calc2.js
exports.add=(a,b)=>a+b;
exports.subtract=(a,b)=>a-b;
exports.multiply=(a,b)=>a*b;
exports.divide=(a,b)=>a/b;
```

함수들을 먼저 선언하고 한번에 export한 calc.js와는 다르게  
calc2.js는 함수를 선언하는 동시에 export를 합니다.  
calc2.js의 방법이 훨씬 간단해 보일 수 있겠지만 주의하셔야 할 점은  
```javascript
exports=add;
```
와 같이 exports 자체에는 절대로 어떤 값도 대입해서는 안됩니다.  
exports가 앞선 예시의 module.exports를 참조하고 있기 때문에,  
다른 값이 대입된다면 본래의 속성을 잃어버립니다.  

calc2.js를 사용하는 방법은 calc.js를 사용하는 방법과 같습니다.  

```javascript
//calcApp2.js
const calc=require('./calc2');
const add=calc.add;
const subtract=calc.subtract;
const multiply=calc.multiply;
const divide=calc.divide;

console.log(add(4,2)); // 6
console.log(subtract(4,2)); // 2
console.log(multiply(4,2)); // 8
console.log(divide(4,2)); // 2
```

### (2) fs module
이번에는 파일 입출력에 관련된 fs 모듈에 대해 알아보겠습니다.  

fs 모듈을 사용하기 위해선 소스코드의 윗부분에  
```javascript
const fs=require('fs');
```
를 입력해 주셔야 합니다.  

이전에는 require('./calc') 처럼 파일의 경로를 지정해줘야 했지만, 기본으로 내장된 모듈이나 추후에 다룰 npm을 이용하여 설치한 모듈은 모듈의 경로를 입력할 필요 없이 모듈의 이름만 입력해 주시면 됩니다.  

#### 1) 파일 쓰기
```javascript
// writeFile.js
const fs=require('fs');

const content='12월 20일 종강';

fs.writeFile('dream.txt',content,(err)=>{
    if (err)
        throw err;
    console.log('파일 썼다!');
});
```
위 소스코드에서 require('fs')를 통해 fs 모듈을 불러왔습니다.  
content에는 문자열을 입력하였고  
fs.writeFile(파일명,파일에 쓸 내용,callback)을 통해  
content를 담고 있는 dream.txt를 생성했습니다.  

생성된 파일 dream.txt는 다음과 같습니다.
```
12월 20일 종강
```

#### 2) 파일 읽기
```javascript
//readFile.js
const fs=require('fs');

fs.readFile('dream.txt',(err,data)=>{
    if (err)
        throw err;
    console.log(data.toString());
});
```
위 소스코드에서는 비동기 방식인 fs.readFile(파일명,callback)을 이용하여 파일을 읽었습니다.  
파일을 여는데 에러가 발생하면 if(err) throw err; 로 에러를 처리해 주고,  
파일을 읽는 데 문제가 없다면 console.log(data.toString()); 으로 콘솔창에 출력합니다.  
콘솔창에 출력된 내용은 다음과 같습니다.  
```
12월 20일 종강
```

fs 모듈에 대해 더 자세히 알아보고 싶으시면 다음 문서를 참고해 주세요.  
(https://nodejs.org/api/fs.html)

### (3) Assignment
input.txt에서 두 수를 입력받아 연산자에 맞는 계산을 한 후 output.txt로 결과를 출력하는 프로그램을 작성해 주세요.  
사칙연산(더하기,빼기,곱하기,나누기)만 고려하며  
사칙연산을 수행하는 함수는 opr.js에서 구현되여 export 되어야 합니다.  
calculateByFile.js는 실제 동작시킬 프로그램이며, fs 모듈을 이용하여  
파일을 읽고, opr.js 모듈을 사용하여 연산을 하고 파일을 쓰는 작업을 담당합니다.  
입력예시 input.txt
```
2,*,3
```
출력예시 output.txt
```
6
```

힌트) split()과 조건문을 사용  
(split method https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)
<a id="express"></a>
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

마지막으로 Headers 탭에서 볼 것이 하나 더 있습니다.  
바로 Status Code 입니다.  
Status code는 response의 header에 존재하며 HTTP 통신이 어떻게 이루어졌는지 세자리의 숫자로 표시한 것입니다.  
네이버의 초록색 검색창이 제대로 보이신다면 아마 Status Code에는 200이 표시되어 있을것입니다.  
흔히 404는 많이 보셨을 텐데요.  
404는 존재하지 않는 주소로의 접근입니다.  
많은 Status code가 있지만,  
간단히 정리하자면 200은 아무 문제 없이 정상적으로 http 통신이 완료된 것입니다.  
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

Increase 버튼을 누르면 /incresse로 POST request가 발생하고  
서버에서는 변수 counter의 값을 1 증가시킨 다음 localhost:3000으로 redirect 해줍니다.  

Decrease 버튼을 누르면 /decrease로 POST request가 발생하고  
서버에서는 변수 counter의 값을 1 감소시킨 다음 localhost:3000으로 redirect 해줍니다.  

Show 버튼을 누르면 /show로 GET request가 발생하고 counter의 값을 response로 전달해 줍니다.  

강의자료에 html파일은 제공되어 있으며 app.js만 새로 작성해주시면 됩니다.  
