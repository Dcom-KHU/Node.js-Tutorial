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

const promiseCountry=(addr)=>{
    return new Promise((resolve,reject)=>{
        // �̰��� �ڵ带 �Է��ϼ���.
    });
}
const promiseProvince=(addr)=>{
    return new Promise((resolve,reject)=>{
        // �̰��� �ڵ带 �Է��ϼ���.
    });
}
const promiseCity=(addr)=>{
    return new Promise((resolve,reject)=>{
        // �̰��� �ڵ带 �Է��ϼ���.
    });
}

const asyncAddress=async (addr)=>{
    try{
        // �̰��� �ڵ带 �Է��ϼ���.
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