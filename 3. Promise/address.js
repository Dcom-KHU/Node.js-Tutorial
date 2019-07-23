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

const promiseCountry=(addr)=>{
    return new Promise((resolve,reject)=>{
        // 이곳에 코드를 입력하세요.
    });
}
const promiseProvince=(addr)=>{
    return new Promise((resolve,reject)=>{
        // 이곳에 코드를 입력하세요.
    });
}
const promiseCity=(addr)=>{
    return new Promise((resolve,reject)=>{
        // 이곳에 코드를 입력하세요.
    });
}

const asyncAddress=async (addr)=>{
    try{
        // 이곳에 코드를 입력하세요.
    }
    catch (err){
        console.error(err);
    }
}

country(address);
address="";
promiseCountry(address)
    .then(promiseProvince)
    .then(promiseCity)
    .then((result)=>{
        console.log("promise : "+result);
    })
address="";
asyncAddress(address);