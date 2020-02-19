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

Arrow Function을 사용하는 이유는 다음 문서를 참고해주세요.  
(<https://velog.io/@ki_blank/JavaScript-화살표-함수Arrow-function>)

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

#### 1) Closure

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
grandParent 함수에는 내부 변수 g3를 갖고 있고 parent 함수를 리턴합니다.  
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
강의 자료 repository를 참고해주세요.  
