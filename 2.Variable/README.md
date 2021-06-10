## 2. Variable
이번 장에서는 Javascript의 변수형과 자료형에 대해 다뤄보도록 하겠습니다.  
### (1) 변수형
Javascript에서 변수는 `let`, 상수는 `const`를 이용하여 선언합니다.  
``` javascript
// 2-1_declaration.js
let variable=1;
variable=2;

const constantVaraible=1;
constantVaraible=2; // TypeError: Assignment to constant variable.
```  
변수로 선언된 variable은 값을 2로 대입했을 때 별 이상이 발생하지 않았지만,  
상수로 선언된 constantVariable의 값을 2로 대입할 때 TypeError가 발생했음을 확인할 수 있습니다.  

이를 통해 상수는 대입 연산자를 통한 변경이 불가능하고 변수는 변경이 가능하다는 점을 알 수 있습니다.  

웹페이지의 script 부분이나 이전에 작성된 javascript 코드를 보면 변수가 `const`나 `let`이 아닌 `var`로 선언됐음을 쉽게 찾을 수 있습니다.   
이전의 Javascript에서는 `var`를 통하여 변수를 선언하였습니다.  
`var`를 사용하여 변수를 사용할 경우, 많은 문제가 발생할 가능성이 있습니다.  
  
```javascript
{
    var x=3;
}
console.log(x); // 3
```
앞서 1장에서 언급하였지만 console.log()는 콘솔에 출력을하는 함수입니다.  
변수 x는 {}가 나타내는 블록 안에서 선언되었고 블록 밖에서 접근되었습니다.  
변수가 선언된 지점과 접근된 지점이 다름에도 불구하고 정상적으로 접근되었습니다.  

```javascript
{
    let y=3;
}
console.log(y); // Uncaught ReferenceError: y is not defined
```
그러나 변수를 `const`나 `let`으로 선언하게 되면 선언한 지점과 접근한 지점이 다를 때, Uncaught ReferenceError를 발생시킵니다.  

또한 변수를 `var`로 선언하게 되면 예기치 못한 문제가 발생할 수 있습니다.  
```javascript
console.log(x); // undefined
var x=1;
```
기존의 다른언어에서는 상상도 못할 결과가 나타납니다.  
다른 언어였다면 선언되지 않은 변수에 대한 접근이기 때문에 에러를 발생시켜야 하는데,  
그저 모른다고(undefined)만 출력합니다.  
이러한 특성은 프로그래머가 의도한 대로 작동하지 않을 여지가 분명하기에 많은 불편함을 초래할 수 있습니다.  

이에 비해 변수를 `const`나 `let`으로 선언하게 되면,
```javascript
console.log(y); // Uncaught ReferenceError: Cannot access 'y' before initialization
const y=1;
```
초기화되지 않은 변수에 대한 접근이기 때문에 정상적으로 오류가 출력되는 것을 확인할 수 있습니다.  

---

### (2) 자료형
이번에는 Javascript에서 다루는 자료형에 대해 알아보도록 하겠습니다.  

기본 자료형에는 `String`, `Number`, `Boolean`, `Array`, `Object` 등이 있습니다.  
Javascript에서는 다른 언어(C++, Java)와는 다르게 변수의 선언은 동일하게 합니다.  
변수에 대입된 값으로 타입을 유추합니다.  
```javascript
//2-2_dataTypes.js
const str="Hello";
const decimal=10;
const float=10.1;
const bool=true;
const arr=[1,2,3,4,5];
const obj={key1:str,key2:decimal};

console.log(str); // Hello
console.log(decimal); // 10
console.log(float); // 10.1
console.log(bool); // true
console.log(arr); // [ 1, 2, 3, 4, 5 ]
console.log(arr[4]); // 5
console.log(obj); // { key1: 'Hello', key2: 10 }
console.log(obj.key1); // Hello
console.log(obj.key2); // 10
console.log(obj['key1']); // Hello
console.log(obj['key2']); // 10
```
위 코드를 보면 아시겠지만, Javascript는 숫자 중에서도 정수형(타 언어에서는 주로 int)과 실수형(타 언어에서는 주로 float)를 따로 구분하지 않습니다.  

배열은 대괄호 []로 선언하며, 각각의 원소는 0부터 시작하는 인덱스를 이용하여 접근할 수 있습니다.  

또한 Python의 dict와 유사한 `Object` 자료형이 있습니다.  
흔히 `JSON`(JavaScript Object Notation)이라고 불리는 이 자료형은 key, value의 쌍으로 이루어져 있습니다.  
value 자리에는 앞서 언급한 `String`,`Number`,`Array` 뿐만 아니라 `함수`도 들어갈 수 있습니다.   

각각의 value는 obj.key1, obj.key2 처럼 `.`으로 접근하거나, 
배열에서 인덱싱하듯이 접근할 수 있습니다.  

이번엔 문자열과 관련된 여러 메소드들을 다뤄보도록 하겠습니다.
```javascript
// 2-3_string.js
const str="I Like Node.js";
console.log(str.length); // 14

const replaced=str.replace('I','You');
console.log(replaced); // You Like Node.js

const splitted=str.split(' ');
console.log(splitted); // [ 'I', 'Like', 'Node.js' ]

console.log(`length of str is ${str.length}`); // length of str is 14
```
str.length는 문자열 str의 길이를 반환합니다.  
str.replace()는 문자열 str에서 첫 인자(I)에 해당하는 부분을 두번째 인자(You)로 변경한 새 문자열을 반환합니다.  
str.split()은 주어진 인자를 구분자로 하여 문자열을 분리한 새 배열을 반환합니다.  
그리고 ``로 감싼 문자열에는 ${변수}를 통해 변수의 값이 들어간 문자열을 생성할 수 있습니다.  
String 자료형에 대한 다른 메소드들은 [공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String)에서 확인해 주세요.  

이번에는 배열과 관련된 여러 메소드들을 다뤄보도록 하겠습니다.  

```javascript
// 2-4_array.js
const arr=['a','b','c','d','e'];

console.log(arr.length); // 5

const exists=arr.includes('c');
console.log(exists); // true

const idx=arr.indexOf('c');
console.log(arr[idx]); // c

arr.push('d');
console.log(arr); // [ 'a', 'b', 'c', 'd', 'e', 'd' ]
```
arr.length는 배열 arr의 길이 5를 반환합니다.  
arr.includes()는 주어진 인자가 배열에 존재하는 지 반환합니다.
arr.push()는 주어진 인자를 배열의 맨 끝에 삽입합니다.  
Array에 대한 다른 메소드들은 [공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)에서 확인해 주세요.  

---
### (3) Assignment
다음 students를 아래 형식에 맞게 출력하는 코드를 작성하세요.
```javascript
// 2-5_student.js
const students=[{name:'서주원',age:20,GPA:4.3},
                {name:'송재혁',age:24,GPA:0.0},
                {name:'조성완',age:17,GPA:2.38}];
```
출력 형식
```
이름: 서주원, 나이: 20, 평점: 4.3
이름: 송재혁, 나이: 24, 평점: 0.0
이름: 조성완, 나이: 17, 평점: 2.38
```