## 4. Promise, async/await
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
    console.log('second: ',result);
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

다음은 4.Promise/4-1_address.js의 일부분입니다.  

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
