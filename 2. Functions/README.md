## 2. Functions
�̹� �忡���� �Լ��� ���ؼ� �ٷ� �����Դϴ�.  

### (1) Arrow Function
�� ���� ���� ����ϴ� sum�̶�� �Լ��� �ֽ��ϴ�.  
�������� javascript������ �Լ��� ������ ���� �ΰ��� ������� �ۼ��ϰ� ����߽��ϴ�.  
```javascript
// �Լ� �����(function declaration)
function sum(a,b){
    return a+b;
}

// �Լ� ǥ����(function expression)
const sum2=function(a,b){
    return a+b;
}
console.log(sum(11,22)); // 33
console.log(sum2(11,22)); // 33
```
�Ϲ�ȭ ���ڸ� ������ �����ϴ�.  
�Լ� �������  
function �Լ��̸�(�Ű�����1, �Ű�����2, ...){  
    ����;  
}  
�Լ� ǥ������  
const �Լ��̸�=function(�Ű�����1, �Ű�����2, ...){  
    ����;  
}  

2015�⿡ ��ǥ�� �ڹٽ�ũ��Ʈ ������ ES2015(=ES6)���� Arrow Function�̶� ���ο� �Լ� ǥ����� ���ԵǾ����ϴ�.  

�ٷ� ���ø� ��� �����ϰڽ��ϴ�.  
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

���� sum_arrow()�� sum()�� sum2()�� �״�� arrow function���� ǥ���� ���Դϴ�.  
sum_arrow()�� sum()�� sum2()������ ���� ��� �����ϰ� ǥ���� ���� Ȯ���� �� �ֽ��ϴ�.  
sum_arrow2()�� �Լ��ȿ��� �������� �ڵ尡 ����Ǵ� ��� �߰�ȣ{}�� �̿��Ͽ� ǥ���߽��ϴ�.  
�Լ��� �Ű������� ���� ��쳪 �Ű������� �ϳ��� ���� ������ ���� ǥ���� �� �ֽ��ϴ�.  
```javascript
const no_param=()=>console.log('no parameter');

const one_param=(a)=>console.log('one parameter :',a);

const one_param2=a=>console.log('one parameter :',a);
```

no_params()�� �Ű������� ���� �Լ��̰� �� �Ұ�ȣ ()�� �̿��Ͽ� ǥ���Ͽ����ϴ�.  
one_param()�� ���� arrow function�� ����ϰ� �Ұ�ȣ �ȿ� �ϳ��� �Ű������� �Է��Ͽ� �ۼ��Ͽ����ϴ�.  
�Ű������� �ϳ��� ���� �Ұ�ȣ�� ������ ä, one_params2()ó�� �Ű����� �ϳ��� �޶� �Է��Ͽ� �ۼ��� ���� �ֽ��ϴ�.  

### (2) Callback Function
�̹����� callback function�� ���� �˾ƺ����� �ϰڽ��ϴ�.  
�� ���� javascript���� �Լ��� ������ ���� ���� ¤��ڽ��ϴ�.  
javascript������ �Լ��� �ϱ� ��ü��, ������ �����ϰų� �Լ��� �Ű������� ������ �� �ֽ��ϴ�.

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

�� �ڵ带 ���캸��  
�� ���� ���� ��ȯ�ϴ� plus()�� �� ���� ���� ��ȯ�ϴ� minus()�� �����߽��ϴ�.  
�� ���� ���� p�� �Լ��� plus�� �Ұ�ȣ ���� �����Ͽ����ϴ�.  
typeof()�� p�� type�� ����غ��� function�� ��µǴ� ���� ����, �Լ��� ������ �����ϴ� ���� �����ϴٴ� ���� �˼��ֽ��ϴ�.  

p�� plus�� �����߱⿡, plus(11,22)�� p(11,22)�� ���� ���� ���� �˴ϴ�.  

�̹����� �Լ��� �Ű������� �Լ��� �����ϰڽ��ϴ�.  
calculate�� �Ű������� func�ڸ����� �Լ��� ���Ե˴ϴ�.  
�Ű������� plus�� �����ϸ� �� �� a, b�� ���� ��µǰ�, minus�� �����ϸ� �� �� a, b�� ���� ��µ˴ϴ�.  

���� callback function�� ���� �˾ƺ��ڽ��ϴ�.  
callback�� ������ ���Ǵ� '��� ��ȭ', 'ȸ��'�̶�� ���Դϴ�.  

callback function�� Ư�� �Լ��� �Ű������� ���޵� �Լ��� ���ϸ�, Ư�� �Լ��� ����� �� ȣ��Ǵ� ������� �۵��մϴ�.  

```javascript
const sum=(a,b)=>a+b;

const printResult=(result)=>{
    console.log("�����",result,"�Դϴ�.");
};

const calculateAndPrint=(calculationResult, callback)=>{
    callback(calculationResult);
};

calculateAndPrint(sum(10,20),printResult); // ����� 30 �Դϴ�.
```

�� �ڵ��� �������ٿ��� calculateAndPrint�� ���ڷ� sum(10,20)�� �Լ��� printReuslt�� �Ѱ� �־����ϴ�.  

sum(10,20)�� ���� 30�̱� ������, 
calculateAndPrint�� ù��° ���ڴ� 30�Դϴ�. 
callback�� printResult�� �Ѱ��־��� ������,  
printResult(30)���� "����� 30 �Դϴ�."�� ��µ˴ϴ�.  

### (3) Functional Programming
�� �������� �Լ��� ���α׷��ֿ� ���� �˾ƺ��ڽ��ϴ�.  
���� ���α׷��ӿ��� ���α׷����� ������ �����ϰ� �����ϴ� ������ �ϴ� ���α׷��� �з����ӿ��� ũ�� �ΰ��� ����� �ֽ��ϴ�.  
- ����� ���α׷���: ���α׷����� ���¿� ���¸� �����Ű�� ������ �������� ������ �����ϴ� ���
    - �������� ���α׷���: ����Ǿ�� �� �������� �������� �����ϴ� ��� (C,C++)
    - ��ü���� ���α׷���: ��ü���� �������� ���α׷��� ��ȣ�ۿ��� ǥ�� (C++, Java, C#)
- ������ ���α׷���: � ������� �ؾ� �ϴ����� ��Ÿ���� ���� ������ ������ �����ϴ� ���
    - �Լ��� ���α׷���: ���� �Լ��� �����ϰ� ����Ʈ��� ����� ���
    
�ٷ� ���ø� ��� �����ϰڽ��ϴ�.
```javascript
// ����� ���α׷���
const double=(arr)=>{
    let results=[];
    for(let i=0;i<arr.length;i++){
        results.push(arr[i]*2);
    }
    return results;
}
// �Լ��� ���α׷���
const double=(arr)=>{
    return arr.map((item)=>item*2);
}
```

����� ���α׷��ֿ����� for ���� �̿��Ͽ� �� �迭�� ���Ҹ� 2���Ͽ� ���ο� �迭�� ��ȯ������,  
�Լ��� ���α׷��ֿ����� map()�̶�� �Լ��� �̿��Ͽ� ��ȯ�߽��ϴ�.  

Node.js���� ����ó���� �񵿱� ó���� �Ҷ��� �Լ��� ���α׷����� �����մϴ�.  

#### 1) Closer

�����Լ��� �����ϴ�(����ϴ�) �ܺ��Լ��� ���������� �ܺ��Լ��� ���ϵ� ���Ŀ��� ��ȿ���� ������ ��, �� �����Լ��� Ŭ������� �մϴ�.  
Ŭ������
- �ڽ��� �ڵ� ��� ���� ���ǵ� ����
- �ܺ� �Լ��� ���ο� ���ǵ� ������ ���� ����
- ���������� ���� ����
�� �� 3������ ������ ü���� �����ٰ� �� �� �ֽ��ϴ�.  

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

const parentFunction=grandParent(1,2); // parentFunction�� g1,g2,g3���� ���� ����
const childFunction=parentFunction(11,22); // childFunction�� g1,g2,g3,p1,p2,p3���� ���� ����
console.log(childFunction(111,222)); // 738
```

���� ù��° �ٿ� grandParent �Լ� �ȿ� 2���� �Լ��� �� ���ǵǾ� ������ �� �Լ��� �����Ҷ� ���������� �����մϴ�.  
grandParent �Լ����� ���� ���� g3�� parent �Լ��� �����մϴ�.  
parent �Լ��� ���� ���� p3�� ���� ������, child �Լ��� �����մϴ�.  
child�Լ��� ���� ���� c3�� ���� ������ �ڽ��� �ܺ� �Լ��� grandParent�� parent�� �Ű������� ���� ����, �ڽ��� �Ű� ������ ���� ������ �� ���� �����մϴ�.  

�̶�, child�� Ŭ�����̸�, �ܺ��Լ��� �Ķ���Ϳ� ������ ������ �����ϹǷ�, ���� ������ �����ϱ⿡ ȣ��� �� ���������� �� ���� ������ �� �ֽ��ϴ�.  

parentFunction�� grandParent �Լ��� �ʱ�ȭ�Ͽ� �ش� �Լ� ���� �� ���ο� ���ǵ� parent �Լ��� �����ϵ��� �Ͽ����ϴ�. ����, parentFunction�� ��� ���ϵ� child �Լ��� childFunction�� �ʱ�ȭ ���׽��ϴ�.  

#### 2) Curring
�������� �Ű������� ���� �Լ��� ���� �� �� �� �Ϻ��� �Ķ���͸� �ʿ���ϴ� �Լ��� ����� ����� Ŀ���̶�� �մϴ�.

```javascript
const add=x=>y=>x+y;
const add10=add(10);

console.log(add10(20)); // 30
console.log(add(10)(20)); // 30
```
Ŀ���� ȭ��ǥ �������� ���� ���� ������ ������ add10 ó�� �Լ��� ��ȯ�մϴ�.

���� add10 �Լ���
```javascript
const add10=y=>10+y;
```
�� �����ϴ�.  

#### 3) Filter

�迭���� Ư�� ������ ���� ������ �Ǵ� object�� �����ϰ� �ʹٸ�, filter�� ����ϴ� ���� �����ϴ�.

```javascript
const ages=[11,12,13,16,21,31];

const upper16=ages.filter(age=>age>16); // [21, 31]
const under13=ages.filter(age=>age<13); // [11, 12]
const between12And21=ages.filter(age=>age>12 && age <21); // [13, 16]
```
filter�� �Ű������� �� �Լ��� �迭�� ������ item�� �����մϴ�.  
�̶�, age�� �迭�� �� item�� �ش��մϴ�.  
�ڿ� ������ ������ true�� ��쿡�� push�մϴ�.

#### 4) Map

map �Լ��� �迭�� ������ item�� ���Ͽ� �Ű������� �� �Լ��� ������� �迭�� �����մϴ�.  

```javascript
const list = [1,2,3];
const squaredList=list.map(item=>item*item); // [1, 4, 9];
```
map�� �Ű������� item�� ������ ����ϴ� �Լ��� �����Ͽ����ϴ�.  

#### 5) Reduce

reduce �Լ��� �迭�� ���� ù��° item���� ������ item���� �Ű������� �� �Լ��� ���� �����ŵ�ϴ�.

```javascript
const scores=[10,20,30,40,50];

const sum=scores.reduce((a,b)=>(a+b));
const sumWithInitValue=scores.reduce((a,b)=>(a+b),10);
```
sum �Լ�����  
(10, 20)  
((10+20), 30)  
((10+20+30), 40)
...  
�� ���� �ݺ��Ͽ� �Լ��� ����˴ϴ�.  

sumWithInitValue �Լ��� �ʱⰪ���� 10�� �Լ� ���ڷ� �Ѱ��־����ϴ�.  
����  
(10, 10)  
((10+10), 20)  
...  
�� ���� ����˴ϴ�.  
### (4) Assignment
������ 2. Functions/callbackExample.js�� arrow function ���·� �ٲپ� ���ô�.  
���� for���� �ش��ϴ� �κ��� ���� ��� �Լ��� �̿��Ͽ� ������ ���ô�.  
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
������ �ڽ��� github repository�� callbackExample.js�� �����Ͻø� �˴ϴ�.  
���� �ڷ� repository�� �������ּ���.  
