## 5. Modules
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