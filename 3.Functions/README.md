## 3. Functions
이번 장에서는 함수에 대해서 다룰 예정입니다.  

---

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
```javascript
function 함수이름(매개변수1, 매개변수2, ...){  
    내용;  
}  
```
함수 표현식은  
```javascript
const 함수이름=function(매개변수1, 매개변수2, ...){  
    내용;  
}  
```

2015년에 발표된 자바스크립트 버전인 ES2015(=ES6)에는 **Arrow Function**이란 새로운 함수 표기법이 포함되었습니다.  

Arrow Function을 사용하는 이유는 [다음 문서](https://velog.io/@ki_blank/JavaScript-화살표-함수Arrow-function)를 참고해주세요.  


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

위의 `sum_arrow()`는 `sum()`와 `sum2()`을 그대로 arrow function으로 표현한 것입니다.  
`sum_arrow()`가 `sum()`나 `sum2()`에비해 눈에 띄게 간단하게 표현된 것을 확인할 수 있습니다.  
`sum_arrow2()`는 함수안에서 여러줄의 코드가 실행되는 경우 중괄호{}를 이용하여 표현했습니다.  
함수의 매개변수가 없는 경우나 매개변수가 하나인 경우는 다음과 같이 표현할 수 있습니다.  
```javascript
const no_param=()=>console.log('no parameter');

const one_param=(a)=>console.log('one parameter :',a);

const one_param2=a=>console.log('one parameter :',a);
```

`no_params()`는 매개변수가 없는 함수이고 빈 소괄호 ()를 이용하여 표현하였습니다.  
`one_param()`은 기존 arrow function과 비슷하게 소괄호 안에 하나의 매개변수를 입력하여 작성하였습니다.  
매개변수가 하나인 경우는 소괄호를 생략한 채, `one_params2()`처럼 매개변수 하나만 달랑 입력하여 작성할 수도 있습니다.  

---

### (2) Callback Function
이번에는 **callback function**에 대해 알아보도록 하겠습니다.  
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
두 수의 합을 반환하는 `plus()`와 두 수의 차를 반환하는 `minus()`를 선언했습니다.  
그 다음 변수 `p`에 함수인 `plus`를 소괄호 없이 대입하였습니다.  
`typeof(`)로 `p`의 type을 출력해보면 function이 출력되는 것을 보아, 함수를 변수에 대입하는 것이 가능하다는 것을 알수있습니다.  

`p`에 `plus`를 대입했기에, `plus(11,22)`와 `p(11,22)`는 같은 값을 갖게 됩니다.  

이번에는 함수의 매개변수에 함수를 전달하겠습니다.  
`calculate`의 매개변수인 `func`자리에는 함수가 들어가게됩니다.  
매개변수로 `plus`를 전달하면 두 수 a, b의 합이 출력되고, `minus`를 전달하면 두 수 a, b의 차가 출력됩니다.  

이제 **callback function**에 대해 알아보겠습니다.  
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

위 코드의 마지막줄에서 `calculateAndPrint`의 인자로 `sum(10,20)`과 함수인 `printReuslt`를 넘겨 주었습니다.  

`sum(10,20)`의 값은 30이기 때문에, 
`calculateAndPrint`의 첫번째 인자는 30입니다. 
callback에 `printResult`을 넘겨주었기 때문에,  
`printResult(30)`에서 "결과는 30 입니다."가 출력됩니다.  

---

### (3) Functions using Callback  
이번 절에서는 Callback을 사용하는 여러 함수들을 살펴보겠습니다.  

#### 1) Filter

배열에서 특정 조건을 가진 데이터 또는 object를 추출하고 싶다면, `filter()`를 사용하는 것이 좋습니다.

```javascript
const ages=[11,12,13,16,21,31];

const upper16=ages.filter(age=>age>16); // [21, 31]
const under13=ages.filter(age=>age<13); // [11, 12]
const between12And21=ages.filter(age=>age>12 && age <21); // [13, 16]
```
`filter()`는 array의 메소드입니다.  
`filter()`는 각각의 원소에 대해 callback 함수를 실행하여 해당 callback 함수가 true를 반환하는 경우에만 새로운 배열에 push합니다.   
이때 age가 배열의 각 item에 해당합니다.  

#### 2) Map

`map()`은 배열의 각각의 item에 대하여 매개변수로 들어간 함수를 적용시켜 배열을 리턴합니다.  

```javascript
const list = [1,2,3];
const squaredList=list.map(item=>item*item); // [1, 4, 9];
```
`map()`에 callback function으로 item의 제곱을 계산하는 함수를 전달하였습니다.  

#### 3) Reduce

`reduce()`는 배열의 가장 첫번째 item부터 마지막 item까지 매개변수로 들어간 함수를 누적 적용시킵니다.

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

#### 4) setTimeout
`setTimeout()`은 주어진 callback 함수를 특정 ms뒤 실행하는 기능을 수행합니다.  

```javascript
setTimeout(()=>{console.log('1초 경과');},1000);
```

#### 5) forEach  
Javascript에서는 `forEach()`를 통해 배열을 순회하면서 특정 callback function을 실행시킬 수 있습니다.  

```javascript
let arr=[1,2,3,4,5,6,7,8];
arr.forEach((currentValue)=>{
    console.log(currentValue);
});
```
다만, `forEach()`는 단순히 array의 각각의 원소들에 대해 callback 함수를 실행 시켜 줄 뿐이지 각각의 callback함수가 동기적으로 실행된다고 보장하지 않습니다.  

```javascript
let arr=[1,2,3,4];
arr.forEach((currentValue)=>{
    setTimeout(()=>{
        console.log(currentValue);
    },1000);
});
```

위 소스코드를 실행하면 arr의 원소들이 1000ms뒤에 한번에 출력됨을 확인할 수 있습니다.  
간단히 생각하면 arr의 모든 원소를 출력하는 데 4000ms가 필요해야하는게 아닌가 싶지만, `forEach()`는 앞서 서술했듯이 그저 주어진 callback 함수를 각각의 원소에 대해서 실행해주는것이기 때문에 각각은 비동기식으로 작동합니다.  

---

### (4) Assignment
다음의 3.Functions/3-1_callbackExample.js를 **arrow function** 형태로 바꾸어 봅시다.  
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
제출은 자신의 github repository에 3-1_callbackExample.js로 제출하시면 됩니다.  
강의 자료 repository를 참고해주세요.  
