## 3. Promise, async/await
### (1) Promise
�񵿱� ó���� �ڿ��� ȿ�������� ����ϰ� �ӵ��� ���̴� ������� ���� ����մϴ�.  
�񵿱�� ������ ���� callback �Լ��� �ſ� ���� ����ϴµ�,  
�̴� �ռ� 1.Introduction���� ����� �ٿ� ���� callback hell�� ���� �ڵ��� �������� �������� �Ǽ��� ������ �����ϴ�.  
�̸� �ذ��ϱ� ���� ���� Promise�Դϴ�.  

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
resolve�� ���� �Լ����� return�� �����ϴ�.  
ó���� resolve(1)�� �ϸ�, 1�� .then()���� �̾� ����Ǵ� �Լ��� ���ڷ� ���ϴ�.  
�׷��⿡ first: 1�� ��µ˴ϴ�.  

Promise�� �� �ٸ� Promise ��ü�� ��ȯ�ϱ� ������ �������� ������ ���� .then(result=>console.log(result));�� ������־����ϴ�.  

�������� Promise ��ü�� ���� ������ ��, �ѹ��� ��ó�� �Ҽ��� �ֽ��ϴ�.  

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

promiseFirst�� resolve(1)�� �ְ� 10�� ���߰�, promiseSecond�� resolve(2)�� �ְ� 20�� ���߽��ϴ�.  
�� �� Promise�� Promise.all()�� �̿��� ó���߽��ϴ�.  
�̶� return���� �迭�̱� ������ sum�� ���ϴ� �������� result\[0\]�� result\[1\]�� �̿��� �����߽��ϴ�.  

### (2) Async/await
async/await�� callback hell�� Ż���ϰ��� ���� Promise������ ��Ȳ�ϰ� ���� ES2017(=ES8)�������� ź���߽��ϴ�.  
�ҽ��ڵ�� �Բ� ���� �帮�ڽ��ϴ�.  
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
�� �ڵ�� �Լ��� �Ű������� �־��� ���� 10�� ���ؼ� Promise ��ü�� �����ϴ� �Լ� promiseAdd10��, �Ű������� �־��� ���� 10�� ���� Promise ��ü�� �����ϴ� �Լ� promiseSubtract10�� ������ ���ҽ��ϴ�.  
�� �Լ��� ������� �����ϰ��� �ϸ� ������ ���� �ڵ尡 ���ɴϴ�.  
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
        console.log("�����",result,"�Դϴ�."); // ����� 90 �Դϴ�.
    });
```

callback ���¿� ���ؼ��� �������� ���� ���Ǿ����� �ڵ尡 ������ٸ� ������ ���� ��������� ���� ���������Դϴ�.  
�̸� ���� �������� ����� ���ڽ��ϴ�.  
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
        console.log("�����",result,"�Դϴ�."); 
    }
    catch (err){
        console.error(err);
    }
}

calculate(); // ����� 90 �Դϴ�.
```
���������� ����� �ϴ� calculate �Լ��� �����Ͽ����ϴ�.  
���� �ٷ� �� �Լ������ ���̰� ������ Ȯ���� �� �ֽ��ϴ�.  
�ٷ� �Լ��� �Ű����� �տ� async��� �ܾ �����Ͱ�, try,catch ���� �߰� �Ǿ���,  
�Լ��� �����ϱ� �ռ� await�̶�� �ܾ �پ����ϴ�.  

await�� Promise�� resolve�� �Ϲ� �Լ��� returnó�� ����Ͽ�,  callback�̳� then���� �̾����� ������ �ڵ带  
����(Synchronous) ���·� ����� �ִ� ������ �մϴ�.  

�� ���⼭ ������ ���� await�� ������ async �Լ� �ȿ��� ���Ǿ�� �մϴ�.  
����, await �ڿ� ������ �Լ��� Promise ��ü�� ��ȯ�Ͽ��� �մϴ�.  
������ async �Լ��� ǥ���ϴ� �������� �����Դϴ�.  

```javascript
const functionExpression=async function(){
    console.log("�Լ� ǥ����");
}
const arrowFunction = async () =>{
    console.log("ȭ��ǥ �Լ�");
}
const ITFE=(async ()=>{
    console.log("��� ���� �Լ� ǥ����");
})();
```
���� await ���� �Լ��� �����߿� ������ �߻��ϸ� ��� �ɱ��?  
�ƹ� �ϵ� �Ͼ�� �ʽ��ϴ�.  
����� �������� ������ ��� ������ �߻��ߴ� �� �ľ��ϴ� ���� �ſ� �߿��մϴ�.  
�̸� �����ִ� ���� try catch���Դϴ�.  
try �� �ȿ��� �߻��� ������ catch ���� ���� err �� ���� �˴ϴ�.  

### (3) Assignment

������ 3. Promise/address.js�� �Ϻκ��Դϴ�.  

```javascript
let address="";

const country=(addr)=>{
    addr+="���ѹα� ";
    const province=(addr)=>{
        addr+="��⵵ ";
        const city=(addr)=>{
            addr+="���ν� ";
            console.log("original : "+addr);
        }
        return city(addr);
    }
    return province(addr);
}

country(address) // original : ���ѹα� ��⵵ ���ν�
```

�� �ڵ带 �����Ͽ� ���� �ڵ带 Promise ���·� ���� �� ȣ���ϰ�, Promise���� async/await ������� ȣ���� ���ϴ�.

��� ���ô� ������ �����ϴ�.  
```bash
original : ���ѹα� ��⵵ ���ν�
promise : ���ѹα� ��⵵ ���ν�
async/await : ���ѹα� ��⵵ ���ν�
```

������ ������ ���������� ������ repository�� ���ֽø� �˴ϴ�.