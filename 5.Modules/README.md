## 5. Modules
�̹� ���Ǵ� ��⿡ ���� �����ϵ��� �ϰڽ��ϴ�.  

����� �ϳ��� �������� ����Ʈ�����Դϴ�.  
����� ����ϰ� �Ǹ� �ҽ��ڵ��� ���̰� �پ��� �������� ���ǰ�  
��ɺ���, �Լ����� �и��Ͽ� �ۼ��ϱ� ������ ���� �� ������ ���մϴ�.  

�ٸ� ������ ���迡 �����ڸ�  

C++�� �غ��� ���̶�� #include �� ���� ����� ���� ��� �����̳� ���� ���̺귯���� ������ ����� �� �־����ϴ�.    
ex) 
``` c++
#include <iostream>
```
Ȥ�� Python�� ����ϼ̴ٸ� import�� from ... import ...�� ���� �ٸ� ����� ������ ����� �� �־����ϴ�.  
ex) 
```python
from math import *  
```
Node.js������ module.exports�� require�� �̿��ؼ� ����� �����ϰ� ������ ����� �� �ֽ��ϴ�.

### (1) module.exports / require

```javascript
//add.js
const add=(a,b)=>a+b;

module.exports=add;
```
�� ���� ���� �������ִ� add �Լ��� �����Ͽ����ϴ�.  

�� ������ �� module.exports=add;�� ���� �ٸ� ���Ͽ��� add �Լ��� ����� �� �ְ� �Ͽ����ϴ�.  
�� �Լ��� �ٸ� ���Ͽ��� ����ϴ� ����� ������ �����ϴ�.  

```javascript
//app.js
const add=require('./add');

console.log(add(1,2)); // 3
```

�� �ҽ��ڵ� ó�� require�� ��ȣ �ӿ� ����ϰ��� �ϴ� ����� ��θ� �Է��� �ָ� module.exports= �� �Էµ� �Լ��� ����� �� �ְ� �˴ϴ�.  
add.js ���� module.exports=add �� add �Լ��� export ���־��� ������  
app.js�� require('./add')�� add.js�� add �Լ��� �ǹ��ϰ� �˴ϴ�.  

�׷��ٸ� module.exports�� �ϳ��� �Լ��� �����ұ��?  
���� �ҽ��ڵ带 ���� ������ �ϰڽ��ϴ�.  
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

module.exports�� JSON���� �Լ����� export ���־����ϴ�.  
(JSON�̶�? https://ko.wikipedia.org/wiki/JSON)

�׷� �� ����� ��� ����ұ��?

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

ù��° ���� ����մϴ�.  
�������� �켱 ��� ��ü�� �������� ���� require('./calc') �κа�  
�ش� ����� �Լ��� �������� ���� calc.add; calc.subtract; ... �κ����� �������� �ֽ��ϴ�.  

module.exports�Ҷ� ����ߴ� key���� ����� �ֽø� �˴ϴ�.  

����� export�ϴµ��� �� �ٸ� ����� �ֽ��ϴ�.  
```javascript
//calc2.js
exports.add=(a,b)=>a+b;
exports.subtract=(a,b)=>a-b;
exports.multiply=(a,b)=>a*b;
exports.divide=(a,b)=>a/b;
```

�Լ����� ���� �����ϰ� �ѹ��� export�� calc.js�ʹ� �ٸ���  
calc2.js�� �Լ��� �����ϴ� ���ÿ� export�� �մϴ�.  
calc2.js�� ����� �ξ� ������ ���� �� �ְ����� �����ϼž� �� ����  
```javascript
exports=add;
```
�� ���� exports ��ü���� ����� � ���� �����ؼ��� �ȵ˴ϴ�.  
exports�� �ռ� ������ module.exports�� �����ϰ� �ֱ� ������,  
�ٸ� ���� ���Եȴٸ� ������ �Ӽ��� �Ҿ�����ϴ�.  

calc2.js�� ����ϴ� ����� calc.js�� ����ϴ� ����� �����ϴ�.  

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
�̹����� ���� ����¿� ���õ� fs ��⿡ ���� �˾ƺ��ڽ��ϴ�.  

fs ����� ����ϱ� ���ؼ� �ҽ��ڵ��� ���κп�  
```javascript
const fs=require('fs');
```
�� �Է��� �ּž� �մϴ�.  

�������� require('./calc') ó�� ������ ��θ� ��������� ������, �⺻���� ����� ����̳� ���Ŀ� �ٷ� npm�� �̿��Ͽ� ��ġ�� ����� ����� ��θ� �Է��� �ʿ� ���� ����� �̸��� �Է��� �ֽø� �˴ϴ�.  

#### 1) ���� ����
```javascript
// writeFile.js
const fs=require('fs');

const content='12�� 20�� ����';

fs.writeFile('dream.txt',content,(err)=>{
    if (err)
        throw err;
    console.log('���� ���!');
});
```
�� �ҽ��ڵ忡�� require('fs')�� ���� fs ����� �ҷ��Խ��ϴ�.  
content���� ���ڿ��� �Է��Ͽ���  
fs.writeFile(���ϸ�,���Ͽ� �� ����,callback)�� ����  
content�� ��� �ִ� dream.txt�� �����߽��ϴ�.  

������ ���� dream.txt�� ������ �����ϴ�.
```
12�� 20�� ����
```

#### 2) ���� �б�
```javascript
//readFile.js
const fs=require('fs');

fs.readFile('dream.txt',(err,data)=>{
    if (err)
        throw err;
    console.log(data.toString());
});
```
�� �ҽ��ڵ忡���� �񵿱� ����� fs.readFile(���ϸ�,callback)�� �̿��Ͽ� ������ �о����ϴ�.  
������ ���µ� ������ �߻��ϸ� if(err) throw err; �� ������ ó���� �ְ�,  
������ �д� �� ������ ���ٸ� console.log(data.toString()); ���� �ܼ�â�� ����մϴ�.  
�ܼ�â�� ��µ� ������ ������ �����ϴ�.  
```
12�� 20�� ����
```

fs ��⿡ ���� �� �ڼ��� �˾ƺ��� �����ø� ���� ������ ������ �ּ���.  
(https://nodejs.org/api/fs.html)

### (3) Assignment
input.txt���� �� ���� �Է¹޾� �����ڿ� �´� ����� �� �� output.txt�� ����� ����ϴ� ���α׷��� �ۼ��� �ּ���.  
��Ģ����(���ϱ�,����,���ϱ�,������)�� ����ϸ�  
��Ģ������ �����ϴ� �Լ��� opr.js���� �����ǿ� export �Ǿ�� �մϴ�.  
calculateByFile.js�� ���� ���۽�ų ���α׷��̸�, fs ����� �̿��Ͽ�  
������ �а�, opr.js ����� ����Ͽ� ������ �ϰ� ������ ���� �۾��� ����մϴ�.  
�Է¿��� input.txt
```
2,*,3
```
��¿��� output.txt
```
6
```

��Ʈ) split()�� ���ǹ��� ���  
(split method https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)