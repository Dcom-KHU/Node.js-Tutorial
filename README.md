# 2019-Node.js-Study
1. [Introduction](#introduction)
1. Functions
1. Promise, async/await
1. Modules
1. Express
1. Router
1. Cookies & Session 


## 1. Introduction <a id="introduction"></a>  
### (1) Node.js ��?
Node.js�� ������ V8 ������ ���������ͷ� ����ϴ� ��Ÿ���Դϴ�.

�� ����Ʈ���忡���� ���Ǵ� JavaScript�� ������ ���� �ٸ� ȯ�濡���� ����� �� �ְ� �� ���Դϴ�.

#### Node.js�� �����
�����̶� �� �� �ִ� ���� ũ�� �������� �ֽ��ϴ�.  
ù��°�δ� Javascript�� ������� �ϰ� �ֱ� ������, �� ����Ʈ���忡�� Javascript�� �ٷ� ���Ҵٸ� ���� ���� �� �ֽ��ϴ�. 
�ι�°�δ� ��緮�� ����� ���� �ֱ� ������, �����ڰ� �̿��ϰ��� �ϴ� ��κ��� ����� ���� ���� �� �ֽ��ϴ�.
<img src="E:/������б�/3-����/2019-Node.js-Study/img/1.png">  
�� �̹����� 2019�� 7�� ����, www.modulecounts.com ���� ����� ������ ���� �׷����Դϴ�.  
Node.js�� �ش��ϴ� npm(node.js package manager)�� �е��� ���̷� 1���� �Ѱ��� �� �� �ֽ��ϴ�.  
����°�δ� �񵿱�(Asynchronous)�Դϴ�.  
���α׷��� ���������� ���۵Ǵ� ���� �ƴ� �̺�Ʈ ������� ����Ǳ� ������ �ſ� ������ ȿ�������� �۵��մϴ�.

������ ������ ���캸�ڽ��ϴ�.  
ù��°�δ� �񵿱�(Asynchronous)�Դϴ�.
�������� ��޵Ǿ��� �� �񵿱�� �����ϴ�.  
������ ���α׷��� ���(Python, C, C++, Java ��)�� �ͼ��� �츮���� �񵿱�� �ʹݿ� ū ȥ���� �ݴϴ�.
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
�� �ҽ��ڵ�� ������ �а� ����ϴ� �κа�, "Exit"��� ����ϴ� �κ����� ���������ֽ��ϴ�.  
������ ó���̽ñ� ������ �ҽ��ڵ� ��ü�� �����Ϸ� ���� �����ŵ� �˴ϴ�.  
1���� 2���� console.log()�� �ܼ�â�� ����ϴ� �Լ��Դϴ�.  
1���� 2�� �� ������� ���� ����ɰ��̶� �����Ͻó���?  
1���̶� ����ϼ̴ٸ� ������ ���α׷��ֿ� �̹� �ͼ������� ���Դϴ�.  
������ 2���� ��µ� ��, 1���� ��µ˴ϴ�.  

ó�� ���Ͻ� ���̶�� ū ȥ���� �������� ���Դϴ�.  
������ Node.js�� ���鼭 ���� ������� ������ ���� �� �κ��Դϴ�.  

�ι�°��, �� �ҽ��ڵ忡�� ���� 3���� ���������� �о�� �Ѵٸ� ��� �ɱ��?  
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
���� �̷� ������ �˴ϴ�.  
�ҽ��ڵ尡 �������� ���� ������ �ֽ��ϴ�.  
������ 3��������, ���� �̷� ������ �� �ݺ��ȴٸ� �ҽ��ڵ�� ���� ������ �����Դϴ�.  
�������� �ҽ��ڵ�� ������ ���� �߻��� �Ӹ� �ƴ϶�, �߻��� ������ ã�� ����� �� ���Դϴ�.  
���� �ҽ��ڵ带 �����ϴٰ� �߰�ȣ{}�� �Ұ�ȣ()�� ���Դ´ٸ�?  
���α׷����� �Ϸ� �ߴµ� ��ȣ ¦ ���߱⳪ �ϰ� �ִ� �������� ã�� �� �������Դϴ�.  
�̷� ��Ȳ�� Callback Hell�̶�� �մϴ�. fs.readFile() �޺κ��� (err,data)�� �ش��ϴ� call back �Լ��� ������ �������� ������.  

������ Node.js�� ����ϴ� ���� �����ڵ鵵 �̷��� �������� �˰� �ֱ⿡ �̸� �ذ��� �پ��� ����� �����մϴ�.  
�̷� ������� ���Ŀ� �ٷ� �����Դϴ�.  

### (2) ����ȯ�� �����ϱ� - Node.js ��ġ
�̹����� Node.js�� ��ġ�غ����� �ϰڽ��ϴ�.  
www.nodejs.org  
Node.js ���Ļ���Ʈ�Դϴ�.  
���� ���� ���� �ٿ�ε���� �϶�� �ϳ׿�.  
LTS ������, Current ������ �ֽ��ϴ�.  
LTS ������ ������ �����̶�� ���ø� �ǰ�, Current ������ �ֽ� �����̶�� �����Ͻø� �˴ϴ�.  
LTS ������ ������ ��ġ���ֽø� �˴ϴ�.  

��ġ�� �Ϸ�Ǿ��ٸ� cmdâ����  
```bash
node -v
```
�� �Է����� ��, ��ġ�� Node.js�� ������ ��µȴٸ� ���������� ��ġ�� �Ȱ��Դϴ�.

### (3) ����ȯ�� �����ϱ� - IDE ��ġ
IDE�� ���� ���� ȯ��(Integrated Development Environment)���� �ڵ�, �����, ������, ���� �� ���α׷� ���߿� ���õ� ��� �۾��� �ϳ��� ���α׷� �ȿ��� ó���ϴ� ȯ���� �����ϴ� ����Ʈ�����Դϴ�.  
Node.js �����ڵ��� �ַ� ����ϴ� IDE������ Visual Studio Code�� Webstorm, Atom ���� �ֽ��ϴ�.  
���� ������ Pycharm�� ����Ͽ��⿡ Webstorm�� �ַ� ���������, Visual Studio Code�� �ſ� ���� ������� �̿��ϴ� IDE�Դϴ�.  
�� ���Ǵ� Webstorm�� Visual Studio Code�� ������� �ۼ��Ǿ����ϴ�.  

#### Webstrom ��ġ�ϱ�
Jetbrains ���� Webstorm�� �ڻ��� pycharm(python), intellij IDEA(java)�� �ٸ��� �����Դϴ�.  
������ �츰 �л��̱� ������ �л� ���̼����� ���� ���������� ����� �� �ֽ��ϴ�.  
���� ��ũ�� �����ִ� ����� ���� ���̼����� �޾ƺ��ô�.  
https://tworab.tistory.com/47  

�л��� ���̼����� ����ٸ�, �̹����� Webstorm�� ��ġ�� �ݽô�.  
https://copycoding.tistory.com/73 

�� ��ũ���� ��ġ��, License Activation���� �츰 �л� ���̼����� ȹ�� �߱� ������ Evaluate for free�� �ƴ� Activate�� üũ�ϰ� �Ʊ� ���̼����� ȹ���� jetbrains �̸��ϰ� ��й�ȣ�� �Է����ֽø� �˴ϴ�.

#### Visual Studio Code ��ġ�ϱ�

https://league-cat.tistory.com/7

�� ��ũ�� ���� ��ġ�Ͻø� �˴ϴ�.

### (3) Hello Node.js ����ϱ�
Webstorm Ȥ�� VS Code�� ������ �ݽô�.
���ϸ��� hello�� javascript ����(.js)�� ������ �ݽô�.  
������ ���� �ҽ��ڵ带 �Է��� ���ô�.  
```javascript
console.log("Hello Node.js!");
```
webstorm�� ��� Alt+Shift+F10�� ������ ������ �ǰ�,  
vscode�� ��� Ctrl+F5�� ������ ������ �˴ϴ�.  
�ܼ�â�� Hello Node.js! �� ����� �� ���� Ȯ�� �� �� �ֽ��ϴ�.  

### (4) Assignment
�ڽ��� �̸��� �ܼ�â�� ����ϴ� ���α׷� hello.js�� �ۼ��Ͽ� �ڽ��� github repository�� ������ �ּ���.  
��¿���:  
Hello �ֿ�!