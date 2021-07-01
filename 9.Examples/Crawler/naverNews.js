// 모듈 임포트
const axios=require('axios');
const cheerio=require('cheerio');

const query=''; // 검색어

// 검색결과 중 뉴스탭의 html를 반환
const Search=(query)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const params={where:'news',query:query} // 검색어와 뉴스탭
            const res=await axios.get(`https://search.naver.com/search.naver`,{params:params}); // params가 url의 query string 형식으로 들어감
            resolve(res.data) // html 반환
        }
        catch(err){
            reject(err);
        }
    });
}

// html을 가지고 기사의 제목과 링크를 출력
const Parse=(content)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const $=cheerio.load(content); // html을 load하여 jQuery와 유사하게 사용 가능
            const titles=$('div.news_area > a.news_tit'); // 뉴스의 제목들을 select
            // 각각의 타이틀에 대해
            for (let title of titles){
                console.log(`${$(title).attr('title')} (${$(title).attr('href')})`); // 뉴스 제목 (링크) 형식으로 출력
            }
        }
        catch(err){
            reject(err);
        }
    });
}

Search(query)
.then(Parse)
.catch((err)=>{
    console.error(err);
});