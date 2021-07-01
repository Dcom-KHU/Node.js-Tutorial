// 모듈 임포트
const puppeteer=require('puppeteer');
const cheerio=require('cheerio');
const axios=require('axios');

const userId=''; // 백준 아이디
const password=''; // 백준 비밀번호

// puppeteer를 이용해 로그인하고 쿠키를 리턴
const Login=()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const browser=await puppeteer.launch({headless:false}); // 간혹가다 recaptcha를 풀어야하기 때문에 headless는 false로 설정
            const page=await browser.newPage(); // 새로운 탭 생성
            await page.goto('https://www.acmicpc.net/login?next=%2F'); // 백준 로그인창으로 이동
            await page.type('input[name=login_user_id]',userId); // 아이디 입력
            await page.type('input[name=login_password]',password); // 비밀번호 입력
            await page.click('#submit_button'); // 로그인 버튼 클릭
            await page.waitForSelector('a.username',{timeout:120000}); // recaptcha를 풀어야 하는 경우, 로그인이 완료될 때 까지 최대 2분 기다림
            const cookies=await page.cookies(); // 쿠키를 가져옴
            await browser.close(); // 브라우저 닫음
            resolve(cookies); // 쿠키 반환
        }
        catch(err){
            reject(err);
        }
    });
}

// 받은 쿠키를 이용해 사용자 정보 출력
const GetUserInfo=(cookies)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let value='';
            // 쿠키중 OnlineJudge 부분만 따로 저장
            for(let cookie of cookies){
                if(cookie.name==='OnlineJudge'){
                    value=cookie.value;
                }
            }
            const option={headers:{Cookie:`OnlineJudge=${value};`}}; // 쿠키를 request header에 담음
            const res=await axios.get(`https://acmicpc.net/user/${userId}`,option); // 사용자 정보 페이지 이동
            const $=cheerio.load(res.data); // html을 load하여 jQuery와 유사하게 사용 가능
            const trs=$('table#statics > tbody > tr'); // 사용자 정보 부분 select
            // 각 행에 대해 정보 출력
            for(let tr of trs){
                console.log(`${$(tr).find('th').text()}: ${$(tr).find('td').text().trim()}`);
            }
            resolve(option); // request option 반환
        }
        catch(err){
            reject(err);
        }
    });
}

// 로그인한 유저의 가장 최근 제출한 소스코드 출력
const GetCurrentSolution=(option)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const params={user_id:userId,language_id:-1,result_id:4}; // user_id: 사용자, 언어는 신경 x, 맞은 결과만 출력
            option.params=params; // option.params에 대입
            const resSubmission=await axios.get('https://www.acmicpc.net/status',option); // 제출 목록 request
            let $=cheerio.load(resSubmission.data); // html을 load하여 jQuery와 유사하게 사용 가능
            const submissions=$('tr'); // 제출 목록에 해당하는 tr select
            // 푼 문제가 없을 경우, throw
            if(submissions.length===1){
                throw '푼 문제가 없습니다.';
            }
            else{
                const url=$('tr:nth-child(2) > td:nth-child(7) > a:nth-child(2)').attr('href'); // 가장 위에 있는 제출의 소스코드 수정에 해당하는 href select
                delete option.params; // 이전에 사용했던 params 삭제
                const resCode=await axios.get('https://www.acmicpc.net'+url,option); // 소스코드 페이지 request
                $=cheerio.load(resCode.data); // html을 load하여 jQuery와 유사하게 사용 가능
                console.log('\n문제번호 :',url.split('/')[2]); // 문제번호 출력
                console.log($('textarea').text()); // 소스코드에 해당하는 textarea select하여 출력
            }
        }
        catch(err){
            reject(err);
        }
    });
}

Login()
.then(GetUserInfo)
.then(GetCurrentSolution)
.catch((err)=>{
    console.error(err);
});
