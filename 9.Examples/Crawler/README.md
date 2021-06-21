# Cralwer Example
## Files  
- naverNews.js : 네이버 뉴스 크롤링
- baekjoon.js : 백준 사용자 정보 및 최근 제출 크롤링
## Installation  
```bash
npm install
```
## Basic Usage
### axios
[NPM](https://www.npmjs.com/package/axios)
1. GET
    ```javascript
    // in async function
    const res=await axios.get(URL,config);
    ```
2. POST
    ```javascript
    // in async function
    const res=await axios.post(URL,data,config);
    ```
### puppeteer
[NPM](https://www.npmjs.com/package/puppeteer)
1. Launch browser
    ```javascript
    // both in async function
    const browser=await puppeteer.launch(); // headless mode
    const browser=await puppeteer.launch({headless:false}); // non-headless mode
    ```
2. Create and Move page
   ```javascript
   // both in async function
   const page=await browser.newPage();
   await page.goto(URL);
   ```
3. Get source
    ```javascript
    // in async function
    const source=await page.content();
    ```
### cheerio
[NPM](https://www.npmjs.com/package/cheerio)  
1. Load HTML
   ```javascript
   const $=cheerio.load(htmlContent);
   ```
2. Select
   ```javascript
   const someTags=$(selector);
   ```
3. Get text
   ```javascript
   // one element
   const text=$(oneTag).text();
   // many elements
   let textArr=[];
   for(let tag of someTags){
       textArr.push($(tag).text());
   }
   ```